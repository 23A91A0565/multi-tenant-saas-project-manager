# Product Requirements Document (PRD)

## User Personas

### Super Admin
- Manages all tenants
- Controls subscription plans

### Tenant Admin
- Manages users, projects, tasks inside tenant

### User
- Works on assigned tasks only

---

## Functional Requirements

FR-001: System shall support tenant registration  
FR-002: System shall isolate tenant data  
FR-003: System shall support JWT authentication  
FR-004: System shall enforce RBAC  
FR-005: System shall enforce subscription limits  
FR-006: System shall allow project creation  
FR-007: System shall allow task assignment  
FR-008: System shall allow task status updates  
FR-009: System shall log audit actions  
FR-010: System shall support Docker deployment  
FR-011: System shall support role-based UI  
FR-012: System shall support pagination  
FR-013: System shall support search  
FR-014: System shall support super admin operations  
FR-015: System shall provide dashboard statistics  

---

## Non-Functional Requirements

NFR-001: API response < 200ms  
NFR-002: Passwords must be hashed  
NFR-003: Support 100+ concurrent users  
NFR-004: 99% uptime  
NFR-005: Mobile responsive UI
