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

    const { title, description, priority, category, dueDate } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const newTodo = {
      id: nanoid(),
      title,
      description: description || null,
      priority: priority || 1,
      category: category || null,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: session.user.id,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [createdTodo] = await db.insert(todos).values(newTodo).returning();

    return NextResponse.json({ todo: createdTodo }, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}