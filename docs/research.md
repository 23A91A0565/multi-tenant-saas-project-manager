# Research Document – Multi-Tenant SaaS Platform

## 1. Multi-Tenancy Architecture Analysis

### Approach 1: Shared Database + Shared Schema
All tenants share the same database and tables. Data isolation is enforced using a `tenant_id` column.

**Pros**
- Cost-efficient
- Easy to manage
- Scales well for SaaS

**Cons**
- Requires strict query filtering
- Security depends on correct implementation

**Chosen Approach:** ✅ This project uses this model.

---

### Approach 2: Shared Database + Separate Schema
Each tenant has its own schema in the same database.

**Pros**
- Better isolation than shared schema
- Easier tenant-level operations

**Cons**
- Schema management complexity
- Harder to scale

---

### Approach 3: Separate Database per Tenant
Each tenant has its own database.

**Pros**
- Maximum isolation
- Strong security

**Cons**
- High cost
- Complex infrastructure
- Poor scalability

---

## 2. Technology Stack Justification

**Backend:** Node.js + Express  
Chosen for fast development, middleware support, and ecosystem.

**Frontend:** React  
Component-based UI, SPA performance, industry standard.

**Database:** PostgreSQL  
Strong relational integrity, ACID compliance.

**Authentication:** JWT  
Stateless, scalable, secure.

**Containerization:** Docker  
Ensures consistent deployment and evaluation.

---

## 3. Security Considerations

1. Tenant isolation using `tenant_id`
2. JWT authentication with expiry
3. bcrypt password hashing
4. Role-based access control (RBAC)
5. CORS restrictions
6. Audit logging for sensitive actions
