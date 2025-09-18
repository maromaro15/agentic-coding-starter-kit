-- Add test user and todos for drag and drop testing
INSERT INTO "user" (id, name, email, "emailVerified", image, "createdAt", "updatedAt") 
VALUES ('test-user-123', 'Test User', 'test@example.com', true, null, NOW(), NOW())
ON CONFLICT(id) DO NOTHING;

-- Add test todos in different quadrants
INSERT INTO todo (id, title, description, urgent, important, completed, "userId", "createdAt", "updatedAt") VALUES
('todo-1', 'Urgent Important Task', 'This task is both urgent and important', true, true, false, 'test-user-123', NOW(), NOW()),
('todo-2', 'Important Not Urgent', 'This task is important but not urgent', false, true, false, 'test-user-123', NOW(), NOW()),
('todo-3', 'Urgent Not Important', 'This task is urgent but not important', true, false, false, 'test-user-123', NOW(), NOW()),
('todo-4', 'Neither Urgent Nor Important', 'This task is neither urgent nor important', false, false, false, 'test-user-123', NOW(), NOW());

-- Create a session for the test user
INSERT INTO session (id, "userId", "expiresAt", token, "createdAt", "updatedAt")
VALUES ('test-session-123', 'test-user-123', NOW() + INTERVAL '7 days', 'test-token-123', NOW(), NOW())
ON CONFLICT(id) DO NOTHING;