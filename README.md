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



# Credentials



See submission.json





---



##  `submission.json` (MANDATORY – EXACT FORMAT)



```json

{

 "testCredentials": {

 "superAdmin": {

  "email": "superadmin@system.com",

  "password": "Admin@123",

  "role": "super_admin",

  "tenantId": null

   },

"tenants": [

 {

    "name": "Demo Company",

    "subdomain": "demo",

     "admin": {

       "email": "admin@demo.com",

       "password": "Demo@123",

       "role": "tenant_admin"

      },

    "users": [

       {

        "email": "user1@demo.com",

        "password": "User@123",

        "role": "user"

    }

    ]

   }

  ]

 }

}

