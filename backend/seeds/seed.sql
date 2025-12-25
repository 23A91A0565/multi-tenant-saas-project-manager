-- =========================
-- EXTENSIONS
-- =========================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- SUPER ADMIN
-- Password: Admin@123
-- =========================
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  NULL,
  'superadmin@system.com',
  '$2b$10$y4E3X0r5r5Cq4G5NwqkD9OQ2G8Q5eY8xQ8X9J3cYB0Yt7mQ9Y9dH6',
  'Super Admin',
  'super_admin'
)
ON CONFLICT DO NOTHING;

-- =========================
-- TENANT
-- =========================
INSERT INTO tenants (id, name, subdomain, subscription_plan, max_users, max_projects)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Demo Company',
  'demo',
  'pro',
  25,
  15
)
ON CONFLICT DO NOTHING;

-- =========================
-- TENANT ADMIN
-- Password: Demo@123
-- =========================
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'admin@demo.com',
  '$2b$10$3zYF8A7C2yE5ZkFZxX7n5n6T5QmR9HqkP2pJQ8J0CqkE2CzQp0u7a',
  'Demo Admin',
  'tenant_admin'
)
ON CONFLICT DO NOTHING;

-- =========================
-- REGULAR USERS
-- Password: User@123
-- =========================
INSERT INTO users (id, tenant_id, email, password_hash, full_name, role)
VALUES
(
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'user1@demo.com',
  '$2b$10$E5zN8k2ZkR3P6Q9K5GJHqD6B8T9MZy7E9xT4Z3HkF6qC2E1RkP5a',
  'Demo User 1',
  'user'
),
(
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  'user2@demo.com',
  '$2b$10$E5zN8k2ZkR3P6Q9K5GJHqD6B8T9MZy7E9xT4Z3HkF6qC2E1RkP5a',
  'Demo User 2',
  'user'
)
ON CONFLICT DO NOTHING;
