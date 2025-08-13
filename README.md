# Healthcare Data Integration and Consulting Platform (WIP)

**🚧 Work In Progress - Active Development 🚧**

## 🏥 Overview
This project is modified revenue performance analytics platform that I developed when I worked at Japanese consulting company. A modern, scalable data integration platform designed consulting platform for healthcare clinic in Japan. This platform enables medical clinics to consolidate revenue performance data from multiple sources, providing real-time analytics and proposing insights with AI for better decision-making with peer aggregated data.

## Tech Stack
This project is separated into 4 components frontend, backend, infrastructure, and ETL server. 
- Frontend
  - Nextjs
  - Ant Design
- Backend
  - Django
  - Django-Rest-Framework
- Database / DWH
  - PostgreSQL
  - Redis
  - Snowflake
- Data Lake
  - Apache Iceberg
  - MinIO (S3-compatible storage for development)
- Infrastructure
  - AWS
      - ECS Fargate
      - Elasticache
      - RDS
      - S3
      - Application Load Balancer
  - IaC
      - Terraform
- ETL
  - Apache Spark
  - Apache Airflow
  - Docker
  - Python
- CI/CD
  - GitHub Actions


## 📊 Technology Selection Rationale

### Data Lake Comparison
| Feature | Apache Iceberg | Delta Lake | Apache Hudi | Traditional Parquet |
|---------|---------------|------------|-------------|---------------------|
| **ACID Transactions** | ✅ Full | ✅ Full | ✅ Full | ❌ None |
| **Schema Evolution** | ✅ Excellent | ✅ Good | ✅ Good | ⚠️ Limited |
| **Time Travel** | ✅ Built-in | ✅ Built-in | ✅ Built-in | ❌ None |
| **Partition Evolution** | ✅ Dynamic | ⚠️ Static | ⚠️ Static | ❌ None |
| **Multi-Engine Support** | ✅ Spark, Presto, Flink | ⚠️ Spark-focused | ⚠️ Spark-focused | ✅ Universal |
| **Healthcare Use Case** | ✅ Best fit | ✅ Good | ✅ Good | ❌ Limited |

### ETL Framework Comparison
| Feature | Apache Spark | Apache Flink | Traditional ETL | Python Scripts |
|---------|--------------|--------------|-----------------|----------------|
| **Scalability** | ✅ Excellent | ✅ Excellent | ⚠️ Limited | ❌ Poor |
| **Batch Processing** | ✅ Excellent | ✅ Good | ✅ Good | ✅ Good |
| **Stream Processing** | ✅ Good | ✅ Excellent | ❌ None | ❌ None |
| **Healthcare Data Volume** | ✅ Handles TB+ | ✅ Handles TB+ | ⚠️ GB scale | ❌ MB scale |
| **Learning Curve** | ⚠️ Moderate | ⚠️ Steep | ✅ Easy | ✅ Easy |
| **Community Support** | ✅ Large | ✅ Growing | ⚠️ Vendor-specific | ✅ Large |

### Backend Framework Comparison
| Feature | Django + DRF | FastAPI | Spring Boot | Node.js |
|---------|--------------|---------|-------------|----------|
| **Development Speed** | ✅ Fast | ✅ Fast | ⚠️ Moderate | ✅ Fast |
| **Type Safety** | ⚠️ Optional | ✅ Built-in | ✅ Built-in | ⚠️ Optional |
| **ORM** | ✅ Excellent | ⚠️ External | ✅ Good | ⚠️ External |
| **Admin Interface** | ✅ Built-in | ❌ None | ❌ None | ❌ None |
| **Healthcare Compliance** | ✅ Mature libs | ⚠️ Growing | ✅ Mature | ⚠️ Variable |
| **Team Expertise** | ✅ High | ⚠️ Learning | ⚠️ Low | ⚠️ Medium |

## 🚀 Next Steps  
- **Phase 1: Data Collection**
  - Integrate with receipt computer systems (レセコン) in pilot clinics
  - Establish secure data pipelines
  - Implement data quality validation framework
- **Phase 2: Analytics Enhancement**
  - Develop predictive models for patient volume forecasting
  - Build revenue optimization algorithms
  - Create benchmarking system with anonymized peer data
- **Phase 3: Scale and Expand**
  - Onboard 50+ clinics in the Tokyo metropolitan area
  - Add support for specialized clinics (dental, dermatology)
  - Launch mobile app for clinic administrators
- **Phase 4: AI Integration**
  - Implement natural language processing for unstructured clinical notes
  - Deploy recommendation engine for operational improvements
  - Introduce automated anomaly detection for billing errors
