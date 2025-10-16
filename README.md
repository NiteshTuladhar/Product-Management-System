## Product Management System

A full-stack application built with NestJS (backend) and Next.js 14 (frontend), containerized with Docker.

Tech Stack

### Backend

NestJS - Progressive Node.js framework
TypeScript - Type-safe JavaScript
PostgreSQL - Relational database

### Frontend

Next.js 14 - React framework with App Router
TypeScript - Type-safe JavaScript
Tailwind CSS - Utility-first CSS framework

## DevOps

Docker - Containerization
Docker Compose - Multi-container orchestration
Nginx - Reverse proxy and load balancing

### Prerequisites
Before you begin, ensure you have installed:

Node.js (v20 or higher)
Docker (v24 or higher)
Docker Compose (v2 or higher)
Git

### Gett$ing Started
git@github.com:NiteshTuladhar/Product-Management-System.git
1. Clone the Repository
bashgit clone [](https://github.com/NiteshTuladhar/Product-Management-System.git)
cd your-repo-name

2. Environment Setup
Create a .env file in the root directory:
bashcp .env.example .env

Update the .env file with your configuration:
env# PostgreSQL Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=myapp

### Application URLs
NEXT_PUBLIC_API_URL=http://localhost:5000

3. Running with Docker (Recommended)

Start all services
bash# Build and start all containers
docker-compose up -d

### View logs
docker-compose logs -f

### View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
Stop all services
bashdocker-compose down

### Stop and remove volumes (⚠️ This will delete all data)
docker-compose down -v
4. Running Locally (Without Docker)
Backend Setup
bashcd backend

### Install dependencies
npm install

### Run database migrations (if applicable)
npm run migration:run

### Start development server
npm run start:dev
The backend will be available at http://localhost:5000
Frontend Setup
bashcd frontend

### Install dependencies
npm install

### Start development server
npm run dev
The frontend will be available at http://localhost:3001

### Build without cache
docker-compose build --no-cache

### Start services
docker-compose up

### Start in detached mode
docker-compose up -d

### Stop services
docker-compose down

### View logs
docker-compose logs -f [service_name]

### Execute commands in running container
docker-compose exec backend npm run migration:run
docker-compose exec frontend npm run build

### Restart a specific service
docker-compose restart backend

### Remove all containers, networks, and volumes
docker-compose down -v
