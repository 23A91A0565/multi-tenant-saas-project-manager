-- SUPER ADMIN
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
VALUES (
    uuid_generate_v4(),
    NULL,
    'superadmin@system.com',
    '$2b$10$examplehashedpasswordxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'System Admin',
    'super_admin'
);

-- TENANT
INSERT INTO tenants (id, name, subdomain, subscription_plan, max_users, max_projects)
VALUES (
    uuid_generate_v4(),
    'Demo Company',
    'demo',
    'pro',
    25,
    15
);

-- TENANT ADMIN
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
SELECT
    uuid_generate_v4(),
    t.id,
    'admin@demo.com',
    '$2b$10$examplehashedpasswordxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    'Demo Admin',
    'tenant_admin'
FROM tenants t WHERE t.subdomain = 'demo';
