const { default: fetch } = require('node-fetch');

async function createTestTodos() {
  const todos = [
    {
      title: "Urgent Important Task",
      description: "This task needs immediate attention",
      urgency: 3,
      importance: 3,
      matrix_quadrant: "do_first"
    },
    {
      title: "Important Not Urgent Task",
      description: "This task is important but can be scheduled",
      urgency: 1,
      importance: 3,
      matrix_quadrant: "schedule"
    },
    {
      title: "Urgent Not Important Task",
      description: "This task should be delegated",
      urgency: 3,
      importance: 1,
      matrix_quadrant: "delegate"
    },
    {
      title: "Not Urgent Not Important Task",
      description: "This task can be done later",
      urgency: 1,
      importance: 1,
      matrix_quadrant: "do_later"
    }
  ];

  for (const todo of todos) {
    try {
      const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`Created todo: ${todo.title}`);
      } else {
        console.error(`Failed to create todo: ${todo.title}`, await response.text());
      }
    } catch (error) {
      console.error(`Error creating todo: ${todo.title}`, error.message);
    }
  }
}

createTestTodos();