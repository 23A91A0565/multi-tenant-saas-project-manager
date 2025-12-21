\# Research Document: Multi-Tenant SaaS Platform



\## 1. Multi-Tenancy Architecture Analysis



\### 1.1 Shared Database with Shared Schema (Tenant ID Based)



In a shared database with shared schema multi-tenancy approach, all tenants use the same database and the same set of tables. Data belonging to different tenants is logically separated using a dedicated column, usually called tenant\_id, in every tenant-specific table. This tenant\_id acts as an identifier to determine which records belong to which organization.



In this model, core tables such as users, projects, tasks, and audit\_logs contain a tenant\_id column. Whenever a user performs an action, the system automatically filters database queries using the tenant\_id associated with that user. This ensures that users can only access data belonging to their own tenant and cannot view or modify data from other organizations.



One of the major advantages of this approach is cost efficiency. Since all tenants share the same database and schema, infrastructure costs are significantly reduced compared to maintaining separate databases or schemas for each tenant. This makes it highly suitable for SaaS platforms that expect a large number of small to medium-sized tenants.



Another key benefit is simplified maintenance and deployment. Schema updates, migrations, and bug fixes are applied once and automatically affect all tenants. This reduces operational overhead and minimizes the risk of inconsistencies across tenant environments.



However, this approach also comes with challenges, particularly around data isolation and security. A single incorrect query that does not properly filter by tenant\_id could potentially expose data across tenants. To mitigate this risk, strict backend-level enforcement is required. Tenant isolation must be handled centrally through authentication middleware that injects the tenant\_id from a verified JWT token into every database query.



In practice, this model is widely used by mature SaaS platforms because it balances scalability, performance, and operational simplicity. When combined with strong access control, query-level filtering, and comprehensive audit logging, shared database and shared schema multi-tenancy provides a secure and scalable foundation for multi-tenant applications.





\### 1.2 Shared Database with Separate Schema per Tenant



In the shared database with separate schema approach, all tenants share the same physical database instance, but each tenant has its own dedicated database schema. A schema acts as a logical container that groups tables together, meaning each tenant has its own version of tables such as users, projects, and tasks.



This approach provides stronger data isolation compared to a shared schema model, because tenant data is separated at the schema level rather than the row level. Accidental cross-tenant data access is less likely, as queries are typically scoped to a specific schema.



However, this model introduces additional complexity in schema management. Every time the application schema changes, migrations must be applied to all tenant schemas individually. As the number of tenants grows, managing schema updates, backups, and monitoring becomes increasingly difficult.



While this approach is suitable for systems with a limited number of high-value tenants, it is less ideal for SaaS platforms expecting rapid tenant growth. The operational overhead and complexity often outweigh the benefits for large-scale multi-tenant applications.



---



\### 1.3 Separate Database per Tenant



In the separate database per tenant approach, each tenant is assigned a completely independent database. This provides the strongest level of isolation, as there is no shared data storage between tenants. Each organization’s data, schema, and configuration are fully separated from others.



This model offers clear advantages in terms of security, compliance, and customization. It is especially useful for enterprise customers who require strict data isolation, regulatory compliance, or custom database configurations.



Despite its strong isolation benefits, this approach is the most expensive and operationally complex. Maintaining hundreds or thousands of databases significantly increases infrastructure costs, deployment complexity, and monitoring effort. Database migrations and updates must be executed individually for each tenant.



As a result, this approach is typically used in niche scenarios where isolation is more important than scalability or cost efficiency. For most SaaS platforms targeting a wide user base, this model is not practical.



---



\### 1.4 Comparison of Multi-Tenancy Approaches



The following comparison summarizes the advantages and disadvantages of the three multi-tenancy approaches discussed above.



| Approach | Data Isolation | Cost | Scalability | Operational Complexity |

|--------|---------------|------|-------------|------------------------|

| Shared DB + Shared Schema | Medium (row-level) | Low | High | Low |

| Shared DB + Separate Schema | High (schema-level) | Medium | Medium | High |

| Separate Database per Tenant | Very High | High | Low | Very High |



From a SaaS perspective, scalability and ease of maintenance are critical factors. While stronger isolation models exist, they often introduce complexity that slows down development and increases costs.



---



\### 1.5 Chosen Architecture and Justification



For this project, the Shared Database with Shared Schema approach has been selected. This decision aligns well with the project’s goals of scalability, cost efficiency, and simplicity of deployment.



By using a tenant\_id column in all tenant-specific tables and enforcing tenant isolation at the backend API level, the system ensures that data remains securely separated between tenants. Centralized authentication and authorization using JWT tokens further strengthen isolation by ensuring tenant context is derived only from verified tokens.



This architecture is widely adopted in real-world SaaS platforms because it allows rapid onboarding of new tenants without requiring additional database resources. Combined with strict access control, role-based authorization, and audit logging, this approach provides a robust and production-ready foundation for a multi-tenant SaaS application.



---



\### 2.1 Backend Technology



Node.js with Express.js has been chosen as the backend framework for this project due to its performance, scalability, and suitability for building RESTful APIs. Node.js uses an event-driven, non-blocking I/O model, which allows it to efficiently handle multiple concurrent requests, a critical requirement for SaaS applications serving multiple tenants simultaneously.



Express.js provides a lightweight and flexible framework for structuring APIs, middleware, and routing logic. It allows clear separation of concerns through controllers, services, and middleware layers. This makes it easier to implement authentication, authorization, tenant isolation, and audit logging in a clean and maintainable manner.



Alternative backend frameworks such as Django or Spring Boot were considered. While these frameworks are powerful, Node.js with Express offers faster development cycles, easier Dockerization, and a large ecosystem of libraries suited for modern JavaScript-based full-stack applications.



---



\### 2.2 Frontend Technology



React has been selected as the frontend framework due to its component-based architecture and strong ecosystem for building dynamic user interfaces. React enables the creation of reusable UI components, which is especially useful for implementing role-based views for super administrators, tenant administrators, and regular users.



The use of React Hooks and context allows centralized management of authentication state, user roles, and permissions across the application. This makes it easier to protect routes, conditionally render UI elements, and maintain consistent application behavior.



Compared to alternatives such as Angular or Vue.js, React offers greater flexibility and a broader community ecosystem. Its widespread adoption in the industry also makes it a valuable skill to demonstrate in a production-grade SaaS project.



---



\### 2.3 Database Technology



PostgreSQL has been chosen as the database system for this project due to its reliability, strong support for relational data, and advanced features such as foreign key constraints, indexing, and transactional integrity. These features are essential for maintaining consistent and isolated data across multiple tenants.



The use of foreign keys with cascade delete rules ensures referential integrity between entities such as tenants, users, projects, and tasks. Indexes on tenant\_id columns improve query performance, especially when filtering data per tenant in a shared database environment.



PostgreSQL also integrates well with Docker and supports robust migration and seeding workflows, making it ideal for automated initialization in containerized environments.



---



\### 2.4 Authentication and Authorization



JWT (JSON Web Token) based authentication has been selected to provide stateless and scalable user authentication. JWT tokens allow the backend to verify user identity and role without maintaining server-side session state, which simplifies horizontal scaling.



Each JWT token contains only essential, non-sensitive information such as userId, tenantId, and role. This enables the backend to enforce role-based access control and tenant isolation consistently across all API endpoints.



Alternative approaches such as session-based authentication were considered, but JWT was chosen due to its simplicity, scalability, and suitability for API-driven architectures commonly used in SaaS platforms.



---



\### 2.5 Containerization and Deployment



Docker and Docker Compose have been selected to containerize the frontend, backend, and database services. Containerization ensures consistency across development, testing, and evaluation environments by packaging the application and its dependencies together.



Docker Compose enables one-command deployment of the entire system, including database initialization, backend startup, and frontend availability. This aligns with the project requirement of running the full application using a single docker-compose up -d command.



Using Docker also simplifies environment configuration through environment variables and ensures the application can be easily deployed or evaluated without manual setup steps.



---



\### 3.1 Data Isolation Strategy



Data isolation is the most critical security requirement in a multi-tenant SaaS system. In this project, isolation is enforced using a tenant\_id-based approach at the database and application levels. Every tenant-specific table includes a tenant\_id column that identifies the organization to which each record belongs.



The backend never trusts tenant identifiers provided by the client. Instead, the tenant\_id is extracted exclusively from a verified JWT token issued during authentication. All database queries are automatically filtered using this tenant\_id, ensuring that users can only access data belonging to their own tenant. Super administrators are handled as a special case, with tenant\_id set to NULL and broader access permissions.



This centralized enforcement of tenant isolation significantly reduces the risk of cross-tenant data leakage and ensures consistent security across all API endpoints.



---



\### 3.2 Authentication and Authorization Security



Authentication is implemented using JWT-based authentication to ensure stateless and secure user verification. Upon successful login, the system generates a signed JWT token that includes only essential information such as userId, tenantId, and role.



Authorization is enforced using role-based access control (RBAC). Each API endpoint specifies the roles that are allowed to access it, such as super\_admin, tenant\_admin, or user. Middleware components validate user roles before allowing access to protected resources, preventing unauthorized operations such as regular users managing tenants or subscription plans.



This layered approach ensures that authentication verifies identity, while authorization strictly controls permissions.



---



\### 3.3 Password Management and Hashing



User passwords are never stored in plain text. Instead, all passwords are securely hashed using bcrypt with an appropriate number of salt rounds. This ensures that even if the database were compromised, original passwords cannot be easily recovered.



During login, the system uses bcrypt’s comparison mechanism to verify passwords without exposing sensitive data. Strong password requirements, such as minimum length and complexity, are enforced during user registration to reduce the risk of brute-force attacks.



This approach aligns with industry best practices for secure password management in modern web applications.



---



\### 3.4 API Security Measures



All sensitive API endpoints are protected using authentication middleware that validates JWT tokens and checks token expiration. Requests without valid tokens are rejected with appropriate HTTP status codes such as 401 Unauthorized or 403 Forbidden.



Input validation is applied at the backend level to prevent invalid or malicious data from being processed. This includes validation of email formats, enum values, required fields, and data types. Parameterized queries are used when interacting with the database to protect against SQL injection attacks.



Additionally, Cross-Origin Resource Sharing (CORS) is configured to allow requests only from trusted frontend origins, further reducing exposure to unauthorized access.



---



\### 3.5 Audit Logging and Monitoring



Audit logging plays an important role in security and accountability within the system. All critical actions, such as user creation, project updates, task modifications, and tenant configuration changes, are recorded in the audit\_logs table.



Each audit log entry includes details such as the action performed, the affected entity, the user who performed the action, the associated tenant, and the timestamp. This enables administrators to trace activities, investigate security incidents, and monitor system usage patterns.



By maintaining comprehensive audit logs, the system enhances transparency and supports long-term monitoring and compliance requirements.



