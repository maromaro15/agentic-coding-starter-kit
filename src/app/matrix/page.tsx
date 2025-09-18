"use client";

import { useState, useEffect } from "react";
import { MatrixGrid } from "@/components/todo/matrix-grid";
import { AddTodo } from "@/components/todo/add-todo";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, Filter, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  category?: string;
  urgency: number;
  importance: number;
  matrix_quadrant: "do_first" | "schedule" | "delegate" | "do_later";
  dueDate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function MatrixPage() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todos || []);
      } else {
        toast.error("Failed to load tasks");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAddTodo = async (todoData: {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...todoData,
          dueDate: todoData.dueDate?.toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newTodo = data.todo;
        setTodos(prev => [...prev, newTodo]);
        setShowAddTodo(false);
        toast.success("Task added successfully!");
        return data;
      } else {
        toast.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add task");
    }
  };

  // Update todo
  const handleUpdateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedTodo = data.todo || data;
        setTodos(prev => prev.map(todo => 
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        ));
        toast.success("Task updated successfully!");
      } else {
        toast.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Failed to update task");
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        toast.success("Task deleted successfully!");
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete task");
    }
  };

  // Auto-categorize all uncategorized todos
  const handleAutoCategorize = async () => {
    const uncategorizedTodos = todos.filter(todo => 
      !todo.matrix_quadrant || todo.urgency === undefined || todo.importance === undefined
    );

    if (uncategorizedTodos.length === 0) {
      toast.info("All tasks are already categorized!");
      return;
    }

    toast.info(`Categorizing ${uncategorizedTodos.length} tasks...`);

    for (const todo of uncategorizedTodos) {
      try {
        const response = await fetch("/api/ai/matrix-categorize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            title: todo.title, 
            description: todo.description 
          }),
        });

        if (response.ok) {
          const result = await response.json();
          await handleUpdateTodo(todo.id, {
            urgency: result.urgency,
            importance: result.importance,
            matrix_quadrant: result.matrix_quadrant,
            priority: result.priority,
            category: result.category,
          });
        }
      } catch (error) {
        console.error(`Failed to categorize todo ${todo.id}:`, error);
      }
    }

    toast.success("Auto-categorization completed!");
  };

  // Filter todos based on completion status
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case "active": return !todo.completed;
      case "completed": return todo.completed;
      default: return true;
    }
  });

  // Get statistics
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    do_first: todos.filter(t => t.matrix_quadrant === "do_first").length,
    schedule: todos.filter(t => t.matrix_quadrant === "schedule").length,
    delegate: todos.filter(t => t.matrix_quadrant === "delegate").length,
    do_later: todos.filter(t => t.matrix_quadrant === "do_later").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Eisenhower Matrix...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="hover:bg-accent hover:text-accent-foreground transition-colors p-2 sm:px-3"
            >
              <ArrowLeft className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Eisenhower Matrix</h1>
              <p className="text-sm sm:text-base text-gray-600">Organize tasks by urgency and importance</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            {/* Filter Buttons */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm">
              {["all", "active", "completed"].map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setFilter(filterType as typeof filter)}
                  className="capitalize flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  {filterType}
                </Button>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAutoCategorize}
                className="bg-background hover:bg-accent hover:text-accent-foreground transition-colors flex-1 sm:flex-none text-xs sm:text-sm"
              >
                <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Auto-Categorize</span>
                <span className="sm:hidden">Auto</span>
              </Button>
              
              <Button
                onClick={() => setShowAddTodo(true)}
                className="bg-primary hover:bg-primary-hover hover:text-primary-hover-foreground transition-colors flex-1 sm:flex-none text-xs sm:text-sm"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add Task</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg p-2 sm:p-4 text-center shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg p-2 sm:p-4 text-center shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs sm:text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-red-50 rounded-lg p-2 sm:p-4 text-center shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-red-600">{stats.do_first}</div>
            <div className="text-xs sm:text-sm text-red-700">Do First</div>
          </div>
          <div className="bg-green-50 rounded-lg p-2 sm:p-4 text-center shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.schedule}</div>
            <div className="text-xs sm:text-sm text-green-700">Schedule</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-2 sm:p-4 text-center shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.delegate}</div>
            <div className="text-xs sm:text-sm text-yellow-700">Delegate</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 sm:p-4 text-center shadow-sm">
            <div className="text-lg sm:text-2xl font-bold text-gray-600">{stats.do_later}</div>
            <div className="text-xs sm:text-sm text-gray-700">Do Later</div>
          </div>
        </div>
      </div>

      {/* Add Todo Modal */}
      {showAddTodo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg p-3 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Add New Task</h2>
            <AddTodo
              onAdd={handleAddTodo}
              onCancel={() => setShowAddTodo(false)}
            />
          </div>
        </div>
      )}

      {/* Matrix Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-2 sm:p-6">
          <MatrixGrid
            todos={filteredTodos}
            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>
    </div>
  );
}