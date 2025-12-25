# Multi-Tenant SaaS Project Manager



Production-ready multi-tenant SaaS platform for managing projects and tasks.



## Features

\- Multi-tenant isolation

\- JWT authentication

\- Role-based access

\- Subscription limits

\- Dockerized deployment



## Tech Stack

\- React

\- Node.js

\- Express

\- PostgreSQL

\- Docker



## Setup

```bash

docker-compose up -d



# Health Check



http://localhost:5000/api/health



#Credentials



See submission.json





---



## 6️⃣ `submission.json` (MANDATORY – EXACT FORMAT)



```json

{

&nbsp; "testCredentials": {

&nbsp;   "superAdmin": {

&nbsp;     "email": "superadmin@system.com",

&nbsp;     "password": "Admin@123",

&nbsp;     "role": "super\_admin",

&nbsp;     "tenantId": null

&nbsp;   },

&nbsp;   "tenants": \[

&nbsp;     {

&nbsp;       "name": "Demo Company",

&nbsp;       "subdomain": "demo",

&nbsp;       "admin": {

&nbsp;         "email": "admin@demo.com",

&nbsp;         "password": "Demo@123",

&nbsp;         "role": "tenant\_admin"

&nbsp;       },

&nbsp;       "users": \[

&nbsp;         {

&nbsp;           "email": "user1@demo.com",

&nbsp;           "password": "User@123",

&nbsp;           "role": "user"

&nbsp;         }

&nbsp;       ]

&nbsp;     }

&nbsp;   ]

&nbsp; }

}

