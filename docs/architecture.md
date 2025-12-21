\# System Architecture Document

\## Multi-Tenant SaaS Project \& Task Management Platform



---



\## 1. High-Level System Architecture



The system follows a three-tier architecture consisting of a frontend client, a backend API server, and a relational database. All components are containerized using Docker and orchestrated with Docker Compose to ensure consistent deployment across environments.



The frontend application runs in the browser and communicates with the backend through RESTful APIs. The backend server handles authentication, authorization, business logic, tenant isolation, and database interactions. PostgreSQL is used as the primary data store to maintain tenant-specific and system-level data.



The system architecture diagram is provided in:

docs/images/system-architecture.png



---



\## 2. Authentication and Request Flow



User authentication is handled using JWT-based authentication. When a user logs in, the backend validates credentials and issues a signed JWT token containing userId, tenantId, and role. This token is stored on the client and sent with every subsequent API request.



For each incoming request, authentication middleware validates the token and extracts the user context. Authorization middleware then verifies whether the user has permission to access the requested resource. Tenant isolation is enforced by automatically filtering database queries using the tenantId extracted from the token.



Super admin users are treated as a special case and are not restricted by tenantId filtering.



---



\## 3. Database Architecture and Tenant Isolation



The application uses a shared database with a shared schema multi-tenancy model. All tenant-specific tables include a tenant\_id column to logically separate data between organizations.



Foreign key relationships ensure referential integrity between tenants, users, projects, and tasks. Cascade delete rules are applied where appropriate to prevent orphaned records. Indexes on tenant\_id columns improve query performance and scalability.



The database entity relationship diagram (ERD) is provided in:

docs/images/database-erd.png



---



\## 4. API Architecture and Endpoint Overview



The backend exposes RESTful APIs organized into functional modules. All APIs follow a consistent response format and enforce authentication and authorization rules.



\### Authentication APIs

\- POST /api/auth/register-tenant (Public)

\- POST /api/auth/login (Public)

\- GET /api/auth/me (Authenticated)

\- POST /api/auth/logout (Authenticated)



\### Tenant Management APIs

\- GET /api/tenants/:tenantId (Tenant Admin, Super Admin)

\- PUT /api/tenants/:tenantId (Tenant Admin (limited), Super Admin)

\- GET /api/tenants (Super Admin only)



\### User Management APIs

\- POST /api/tenants/:tenantId/users (Tenant Admin)

\- GET /api/tenants/:tenantId/users (Tenant members)

\- PUT /api/users/:userId (Tenant Admin or Self)

\- DELETE /api/users/:userId (Tenant Admin)



\### Project Management APIs

\- POST /api/projects (Authenticated)

\- GET /api/projects (Authenticated)

\- PUT /api/projects/:projectId (Tenant Admin or Creator)

\- DELETE /api/projects/:projectId (Tenant Admin or Creator)



\### Task Management APIs

\- POST /api/projects/:projectId/tasks (Authenticated)

\- GET /api/projects/:projectId/tasks (Authenticated)

\- PATCH /api/tasks/:taskId/status (Authenticated)

\- PUT /api/tasks/:taskId (Authenticated)



---



\## 5. Role-Based Access Summary



\- Super Admin: Full system access across all tenants

\- Tenant Admin: Full access within own tenant

\- End User: Limited access to assigned projects and tasks



Role-based access control is enforced at the API level using middleware to prevent unauthorized actions.



---



\## 6. Deployment Architecture



All system components are containerized using Docker. Docker Compose is used to orchestrate the database, backend, and frontend services. Fixed port mappings and service names ensure predictable communication between services.



The system can be started using a single command:

docker-compose up -d



This approach ensures consistent and repeatable deployment for development, testing, and evaluation.



