-- SUPER ADMIN
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  NULL,
  'superadmin@system.com',
  '$2b$10$oGnxs2wDua9WiZkvPTtd0epScYi/i1wUNWmNAlNiDbU/.hmbA16Ti',
  'Super Admin',
  'super_admin'
);

-- TENANT
INSERT INTO tenants (id, name, subdomain, subscription_plan, max_users, max_projects)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Demo Company',
  'demo',
  'pro',
  25,
  15
);

-- TENANT ADMIN
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'admin@demo.com',
  '$2b$10$oGnxs2wDua9WiZkvPTtd0epScYi/i1wUNWmNAlNiDbU/.hmbA16Ti',
  'Demo Admin',
  'tenant_admin'
);
