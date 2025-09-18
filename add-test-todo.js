const { drizzle } = require('drizzle-orm/better-sqlite3');
const Database = require('better-sqlite3');
const { todos } = require('./src/lib/schema.js');
const { nanoid } = require('nanoid');

// Create database connection
const sqlite = new Database('./sqlite.db');
const db = drizzle(sqlite);

// Add a test todo
async function addTestTodo() {
  try {
    const testTodo = {
      id: nanoid(),
      title: 'Test Drag and Drop Task',
      description: 'This is a test task to verify drag and drop functionality',
      completed: false,
      priority: 2,
      urgency: 3,
      importance: 2,
      matrix_quadrant: 'do_first',
      userId: 'test-user-id', // You might need to use a real user ID
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.insert(todos).values(testTodo).returning();
    console.log('Test todo added successfully:', result);
  } catch (error) {
    console.error('Error adding test todo:', error);
  } finally {
    sqlite.close();
  }
}

addTestTodo();