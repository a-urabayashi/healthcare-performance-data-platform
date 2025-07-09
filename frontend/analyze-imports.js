const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const allDependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies
};

// Function to extract imports from file content
function extractImports(content) {
  const imports = new Set();
  
  // Match ES6 imports
  const es6ImportRegex = /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  while ((match = es6ImportRegex.exec(content)) !== null) {
    imports.add(match[1]);
  }
  
  // Match require() calls
  const requireRegex = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((match = requireRegex.exec(content)) !== null) {
    imports.add(match[1]);
  }
  
  // Match dynamic imports
  const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    imports.add(match[1]);
  }
  
  return imports;
}

// Function to get package name from import path
function getPackageName(importPath) {
  // Skip relative paths and absolute paths
  if (importPath.startsWith('.') || importPath.startsWith('/') || importPath.startsWith('@/')) {
    return null;
  }
  
  // Handle scoped packages
  if (importPath.startsWith('@')) {
    const parts = importPath.split('/');
    return parts.slice(0, 2).join('/');
  }
  
  // Handle regular packages
  return importPath.split('/')[0];
}

// Recursively find all JS/TS files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findFiles(filePath, fileList);
    } else if (file.match(/\.(js|jsx|ts|tsx)$/)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Main analysis
const srcFiles = findFiles('src');
const usedPackages = new Set();
const importsByPackage = {};

srcFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const imports = extractImports(content);
  
  imports.forEach(importPath => {
    const packageName = getPackageName(importPath);
    if (packageName && allDependencies[packageName]) {
      usedPackages.add(packageName);
      
      if (!importsByPackage[packageName]) {
        importsByPackage[packageName] = new Set();
      }
      importsByPackage[packageName].add(file);
    }
  });
});

// Find unused packages
const unusedPackages = Object.keys(allDependencies).filter(pkg => !usedPackages.has(pkg));

// Generate report
console.log('=== Frontend Package Usage Analysis ===\n');

console.log(`Total packages in package.json: ${Object.keys(allDependencies).length}`);
console.log(`Packages actually used in code: ${usedPackages.size}`);
console.log(`Unused packages: ${unusedPackages.length}\n`);

console.log('=== Used Packages ===');
const sortedUsedPackages = Array.from(usedPackages).sort();
sortedUsedPackages.forEach(pkg => {
  console.log(`✓ ${pkg} (used in ${importsByPackage[pkg].size} files)`);
});

console.log('\n=== Unused Packages ===');
unusedPackages.sort().forEach(pkg => {
  const isDev = packageJson.devDependencies && packageJson.devDependencies[pkg];
  console.log(`✗ ${pkg} ${isDev ? '[dev]' : '[prod]'}`);
});

// Check for Next.js specific packages that might be used implicitly
const implicitPackages = [
  'tailwindcss',
  'autoprefixer',
  'postcss',
  'eslint',
  'eslint-config-next',
  'typescript',
  '@types/node',
  '@types/react',
  '@types/react-dom'
];

console.log('\n=== Implicit/Build-time Dependencies ===');
implicitPackages.forEach(pkg => {
  if (unusedPackages.includes(pkg)) {
    console.log(`ℹ ${pkg} - Used by build tools/config files`);
  }
});