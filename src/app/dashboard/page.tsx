"use client";

import { useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { AddTodo } from "@/components/todo/add-todo";
import { TodoList } from "@/components/todo/todo-list";
import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Lock, Grid3X3 } from 'lucide-react';
import Link from "next/link";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number; // 1=low, 2=medium, 3=high
  category?: string;
  urgency?: number;
  importance?: number;
  matrix_quadrant?: "do_first" | "schedule" | "delegate" | "do_later";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddTodo, setShowAddTodo] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      
      if (response.ok) {
        const data = await response.json();
        
        if (data && Array.isArray(data.todos)) {
          const processedTodos = data.todos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
          urgency: todo.urgency || 0,
          importance: todo.importance || 0,
          matrix_quadrant: todo.matrix_quadrant || null,
        }));
          setTodos(processedTodos);
        } else {
          setTodos([]);
        }
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoData: {
    title: string;
    description?: string;
    priority?: number;
    category?: string;
    urgency?: number;
    importance?: number;
    matrix_quadrant?: "do_first" | "schedule" | "delegate" | "do_later";
    dueDate?: Date;
  }) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });

      if (response.ok) {
        const response_data = await response.json();
        const newTodo = {
          ...response_data.todo,
          createdAt: new Date(response_data.todo.createdAt),
          updatedAt: new Date(response_data.todo.updatedAt),
          dueDate: response_data.todo.dueDate ? new Date(response_data.todo.dueDate) : null,
        };
        setTodos((prev) => [...prev, newTodo]);
        setShowAddTodo(false);
        
        // Return the response data including AI suggestions
        return response_data;
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
      throw error;
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const response_data = await response.json();
        const updatedTodo = response_data.todo;
        const todoWithDates = {
          ...updatedTodo,
          dueDate: updatedTodo.dueDate ? new Date(updatedTodo.dueDate) : undefined,
          createdAt: new Date(updatedTodo.createdAt),
          updatedAt: new Date(updatedTodo.updatedAt),
        };
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? todoWithDates : todo))
        );
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchTodos();
    } else if (!isPending) {
      setLoading(false);
    }
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 bg-card rounded-lg p-12 border shadow-lg">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-lg text-foreground font-medium">Loading dashboard...</p>
          <p className="text-sm text-muted-foreground">Please wait while we prepare your workspace.</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-card rounded-xl p-12 border border-border shadow-sm">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-sm">
                <Lock className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4 text-foreground">Welcome to TaskFlow! 🎉</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ready to supercharge your productivity? Sign in to access your personal dashboard and start managing your tasks with AI-powered insights! ✨
              </p>
            </div>
            <UserProfile />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-card via-secondary/30 to-card rounded-xl p-8 border border-border shadow-sm">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Welcome back, {session.user?.name || 'User'}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to tackle your tasks today? Let's make productivity fun! ✨
            </p>
          </div>
          <UserProfile />
        </div>
        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Button
            onClick={() => setShowAddTodo(!showAddTodo)}
            className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold text-lg px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-250 hover:scale-102"
            size="lg"
          >
            <Plus className="w-6 h-6 mr-3" />
            {showAddTodo ? 'Cancel' : 'Add New Task'}
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="font-semibold text-lg px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-250 hover:scale-102"
            size="lg"
          >
            <Link href="/matrix" className="flex items-center">
              <Grid3X3 className="w-6 h-6 mr-3" />
              Matrix View
            </Link>
          </Button>
        </div>

        {/* Add Todo Section */}
        {showAddTodo && (
          <div className="mb-8 animate-in slide-in-from-top-2 duration-250">
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <AddTodo onAdd={addTodo} />
            </div>
          </div>
        )}

        {/* Todo List Section */}
        <div>
          <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
            <TodoList
               todos={todos}
               onUpdate={updateTodo}
               onDelete={deleteTodo}
             />
          </div>
        </div>
      </div>
    </div>
  );
}
