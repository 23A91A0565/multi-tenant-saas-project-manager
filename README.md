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

```

# Health Check



http://localhost:5000/api/health



#Credentials



See submission.json





---



## 6️⃣ `submission.json` (MANDATORY – EXACT FORMAT)



```json

{

 "testCredentials": {

 "superAdmin": {

  "email": "superadmin@system.com",

  "password": "Admin@123",

  "role": "super\_admin",

  "tenantId": null

   },

"tenants": \[

 {

    "name": "Demo Company",

    "subdomain": "demo",

     "admin": {

       "email": "admin@demo.com",

       "password": "Demo@123",

       "role": "tenant\_admin"

      },

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

