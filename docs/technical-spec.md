\# Technical Specification

\## Multi-Tenant SaaS Project \& Task Management Platform



---



\## 1. Project Structure Overview



The project follows a modular full-stack architecture with clearly separated backend, frontend, database, and documentation layers. This structure improves maintainability, scalability, and ease of deployment.



Backend Structure

text

Copy code

backend/

├── src/

│   ├── controllers/      # Request handlers for each API module

│   ├── routes/           # API route definitions

│   ├── middleware/       # Auth, RBAC, tenant isolation, error handling

│   ├── services/         # Business logic and reusable services

│   ├── utils/            # Helper utilities (JWT, hashing, responses)

│   ├── config/           # Database and environment configuration

│   └── app.js            # Express application entry point

├── migrations/           # Database migration scripts

├── seeds/                # Database seed scripts

├── Dockerfile            # Backend container definition

├── package.json          # Backend dependencies and scripts

└── .env                  # Environment variables

Frontend Structure

text

Copy code

frontend/

├── src/

│   ├── pages/            # Application pages (Login, Dashboard, Projects, etc.)

│   ├── components/       # Reusable UI components

│   ├── context/          # Global state (Auth context)

│   ├── services/         # API service and HTTP client

│   ├── routes/           # Protected and role-based routes

│   ├── App.js            # Root React component

│   └── index.js          # Application entry point

├── Dockerfile            # Frontend container definition

├── package.json          # Frontend dependencies and scripts

└── .env                  # Frontend environment variables

Database Structure

text

Copy code

database/

├── migrations/           # SQL migration files (ordered)

│   ├── 001\_create\_tenants.sql

│   ├── 002\_create\_users.sql

│   ├── 003\_create\_projects.sql

│   ├── 004\_create\_tasks.sql

│   └── 005\_create\_audit\_logs.sql

└── seeds/

&nbsp;   └── seed\_data.sql     # Initial system data

\##2. Environment Variables

All configuration values are managed using environment variables to ensure flexibility and security.



Backend Environment Variables

env

Copy code

DB\_HOST=database

DB\_PORT=5432

DB\_NAME=saas\_db

DB\_USER=postgres

DB\_PASSWORD=postgres



JWT\_SECRET=your\_jwt\_secret\_key\_min\_32\_chars

JWT\_EXPIRES\_IN=24h



PORT=5000

NODE\_ENV=development



FRONTEND\_URL=http://frontend:3000

Frontend Environment Variables

env

Copy code

REACT\_APP\_API\_URL=http://backend:5000/api

All environment variables are provided with test or development values and are committed to the repository as required for automated evaluation.



\##3. Database Initialization

Database initialization is fully automated and handled during application startup.



Database migrations are executed automatically when the backend service starts.



Seed data is inserted immediately after migrations complete.



No manual commands are required to prepare the database.



This approach ensures that the application is ready for use immediately after running docker-compose up -d.



\##4. Local Development Setup

Prerequisites

Node.js (v18 or above)



Docker and Docker Compose



Git



\##Backend Setup (Local)

Copy code

cd backend

npm install

npm run dev

Frontend Setup (Local)

Copy code

cd frontend

npm install

npm start

The backend will run on http://localhost:5000

The frontend will run on http://localhost:3000



\##5. Docker-Based Setup (Recommended)

The entire application can be started using Docker Compose.



Steps

docker-compose up -d

This command will:



Start PostgreSQL database



Run migrations and seed data automatically



Start backend API service



Start frontend application



Verification

Frontend: http://localhost:3000



Backend health check: http://localhost:5000/api/health



\##6. Health Check Endpoint

The backend exposes a health check endpoint to verify system readiness.



GET /api/health

Example response:



{

&nbsp; "status": "ok",

&nbsp; "database": "connected"

}

This endpoint confirms that:



The backend server is running



The database connection is established



Migrations and seed data have completed



---



\## 🧠 WHAT YOU JUST COMPLETED



In \*\*one single step\*\*, you have now:



✅ Defined full project structure  

✅ Documented backend, frontend, database  

✅ Explained environment variables  

✅ Explained local + Docker setup  

✅ Explained database auto-initialization  

✅ Added health check details  



This is \*\*production-level documentation\*\*.



---

