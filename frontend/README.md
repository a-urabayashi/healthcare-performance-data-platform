# Frontend Dashboard (WIP)

**🚧 Work In Progress 🚧**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) for the Healthcare Performance Data Platform.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

- `src/app/` - Next.js App Router pages
  - `auth/` - Authentication pages
  - `dashboard/` - Main dashboard interface
- `src/components/` - React components
  - `auth/` - Authentication components
  - `charts/` - Data visualization components
  - `layout/` - Layout components
  - `shared/` - Shared/common components
  - `ui/` - UI components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Library code and utilities
- `src/services/` - API service layer
- `src/store/` - State management (Redux)
- `src/types/` - TypeScript type definitions

## Features

### Implemented
- Authentication flow with login page
- Dashboard layout with navigation
- Revenue and department charts
- Statistics cards
- Redux state management setup
- Loading states

### TODO
- [ ] Connect to backend API
- [ ] Implement real data fetching
- [ ] Add more chart types
- [ ] Create detailed analytics pages
- [ ] Add user profile management
- [ ] Implement role-based access control
- [ ] Add export functionality
- [ ] Create mobile responsive design
- [ ] Add error handling
- [ ] Implement data caching
- [ ] Add unit and integration tests

## Technology Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **Chart.js** - Data visualization
- **Bun** - JavaScript runtime
