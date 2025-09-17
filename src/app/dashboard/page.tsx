"use client";

import { useSession } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { AddTodo } from "@/components/todo/add-todo";
import { TodoList } from "@/components/todo/todo-list";
import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Lock } from 'lucide-react';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number; // 1=low, 2=medium, 3=high
  category?: string;
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
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
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
          <div className="bg-card rounded-lg p-12 border shadow-lg">
            <div className="mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-lg bg-primary flex items-center justify-center shadow-lg">
                <Lock className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4 text-foreground">Welcome to TaskFlow</h1>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                Please sign in to access your personal dashboard and start managing your tasks.
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
        <div className="flex items-center justify-between mb-8 bg-card rounded-lg p-8 border shadow-lg">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Welcome back, {session.user?.name || 'User'}!
            </h1>
            <p className="text-muted-foreground text-lg font-medium">
              Manage your tasks efficiently and stay organized.
            </p>
          </div>
          <UserProfile />
        </div>
        {/* Add Todo Button */}
        <div className="mb-8">
          <Button
            onClick={() => setShowAddTodo(!showAddTodo)}
            className="font-bold text-lg px-8 py-4 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <Plus className="w-6 h-6 mr-3" />
            {showAddTodo ? 'Cancel' : 'Add New Task'}
          </Button>
        </div>

        {/* Add Todo Section */}
        {showAddTodo && (
          <div className="mb-8">
            <div className="bg-card rounded-lg p-8 border shadow-lg">
              <AddTodo onAdd={addTodo} />
            </div>
          </div>
        )}

        {/* Todo List Section */}
        <div>
          <div className="bg-card rounded-lg p-8 border shadow-lg">
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
