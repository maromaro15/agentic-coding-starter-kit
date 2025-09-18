import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { todos } from "@/lib/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userTodos = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, session.user.id))
      .orderBy(todos.createdAt);

    return NextResponse.json({ todos: userTodos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

async function getAICategorizationSafely(title: string, description?: string) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/ai/categorize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      const result = await response.json();
      return {
        category: result.category,
        priority: result.priority,
        reasoning: result.reasoning
      };
    }
  } catch (error) {
    console.error('AI categorization failed:', error);
  }
  
  // Fallback to defaults if AI fails
  return {
    category: 'General',
    priority: 1,
    reasoning: 'Default categorization (AI unavailable)'
  };
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, description, priority, category, dueDate, skipAI } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Get AI categorization unless explicitly skipped or already provided
    let aiResult = null;
    let finalPriority = priority || 1;
    let finalCategory = category || null;

    if (!skipAI && (!category || !priority)) {
      aiResult = await getAICategorizationSafely(title, description);
      finalPriority = priority || aiResult.priority;
      finalCategory = category || aiResult.category;
    }

    const newTodo = {
      id: nanoid(),
      title,
      description: description || null,
      priority: finalPriority,
      category: finalCategory,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: session.user.id,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [createdTodo] = await db.insert(todos).values(newTodo).returning();

    // Include AI reasoning in response if available
    const response: any = { todo: createdTodo };
    if (aiResult) {
      response.aiSuggestion = {
        category: aiResult.category,
        priority: aiResult.priority,
        reasoning: aiResult.reasoning
      };
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}