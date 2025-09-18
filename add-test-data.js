import postgres from "postgres";
import { config } from "dotenv";

// Load environment variables
config();

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("POSTGRES_URL environment variable is not set");
}

const client = postgres(connectionString);

async function addTestData() {
  try {
    console.log("Adding test user and todos...");
    
    // Add test user
    await client`
      INSERT INTO "user" (id, name, email, "emailVerified", image, "createdAt", "updatedAt") 
      VALUES ('test-user-123', 'Test User', 'test@example.com', true, null, NOW(), NOW())
      ON CONFLICT(id) DO NOTHING
    `;
    
    // Add test todos with matrix quadrants
    await client`
      INSERT INTO todos (id, title, description, urgency, importance, matrix_quadrant, completed, "userId", "createdAt", "updatedAt") VALUES
      ('todo-1', 'Urgent Important Task', 'This task is both urgent and important', 3, 3, 'do_first', false, 'test-user-123', NOW(), NOW()),
      ('todo-2', 'Important Not Urgent', 'This task is important but not urgent', 1, 3, 'schedule', false, 'test-user-123', NOW(), NOW()),
      ('todo-3', 'Urgent Not Important', 'This task is urgent but not important', 3, 1, 'delegate', false, 'test-user-123', NOW(), NOW()),
      ('todo-4', 'Neither Urgent Nor Important', 'This task is neither urgent nor important', 1, 1, 'do_later', false, 'test-user-123', NOW(), NOW())
      ON CONFLICT(id) DO NOTHING
    `;
    
    // Add session for the test user
    await client`
      INSERT INTO session (id, "userId", "expiresAt", token, "createdAt", "updatedAt")
      VALUES ('test-session-123', 'test-user-123', NOW() + INTERVAL '7 days', 'test-token-123', NOW(), NOW())
      ON CONFLICT(id) DO NOTHING
    `;
    
    console.log("✅ Test data added successfully!");
    console.log("Test user ID: test-user-123");
    console.log("Test session token: test-token-123");
    
  } catch (error) {
    console.error("❌ Error adding test data:", error);
  } finally {
    await client.end();
  }
}

addTestData();