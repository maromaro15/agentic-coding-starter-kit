"use client";

import { useState } from "react";
import { Check, X, Edit2, Trash2, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

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

interface QuadrantConfig {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  headerColor: string;
  icon: string;
}

interface QuadrantCardProps {
  quadrant: Todo["matrix_quadrant"];
  config: QuadrantConfig;
  todos: Todo[];
  onUpdateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  onDeleteTodo: (id: string) => Promise<void>;
  onQuadrantChange: (todoId: string, newQuadrant: Todo["matrix_quadrant"]) => Promise<void>;
}

export function QuadrantCard({
  quadrant,
  config,
  todos,
  onUpdateTodo,
  onDeleteTodo,
  onQuadrantChange
}: QuadrantCardProps) {
  const [draggedOver, setDraggedOver] = useState(false);
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    setDraggedOver(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set draggedOver to false if we're leaving the quadrant container
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDraggedOver(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOver(false);
    
    const todoId = e.dataTransfer.getData("text/plain");
    if (todoId && todoId.trim()) {
      try {
        await onQuadrantChange(todoId, quadrant);
      } catch (error) {
        console.error("Failed to move task:", error);
      }
    }
  };

  const handleTodoDragStart = (e: React.DragEvent, todoId: string) => {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", todoId);
    e.dataTransfer.effectAllowed = "move";
    
    // Add visual feedback to the dragged element
    const target = e.target as HTMLElement;
    target.style.opacity = "0.5";
  };

  const handleTodoDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    // Reset visual feedback
    const target = e.target as HTMLElement;
    target.style.opacity = "1";
  };

  const handleToggleComplete = async (todo: Todo) => {
    await onUpdateTodo(todo.id, { completed: !todo.completed });
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingTodo(todo.id);
    setEditTitle(todo.title);
  };

  const handleSaveEdit = async (todoId: string) => {
    if (editTitle.trim()) {
      await onUpdateTodo(todoId, { title: editTitle.trim() });
    }
    setEditingTodo(null);
    setEditTitle("");
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setEditTitle("");
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 3: return "bg-red-100 text-red-800";
      case 2: return "bg-yellow-100 text-yellow-800";
      case 1: return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 3: return "High";
      case 2: return "Medium";
      case 1: return "Low";
      default: return "None";
    }
  };

  return (
    <div
      className={`${config.color} border-2 rounded-lg p-3 sm:p-4 h-full flex flex-col transition-all duration-200 ${
        draggedOver ? "border-blue-400 bg-blue-50 shadow-lg scale-[1.02]" : ""
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Quadrant Header */}
      <div className={`${config.headerColor} rounded-lg p-2 sm:p-3 mb-3 sm:mb-4`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base sm:text-lg">{config.icon}</span>
          <h3 className="font-bold text-base sm:text-lg">{config.title}</h3>
        </div>
        <p className="text-xs sm:text-sm font-medium opacity-90">{config.subtitle}</p>
        <p className="text-xs opacity-75 mt-1 hidden sm:block">{config.description}</p>
      </div>

      {/* Task Count */}
      <div className="mb-2 sm:mb-3">
        <span className="text-xs sm:text-sm text-gray-600">
          {todos.length} task{todos.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Tasks List */}
      <div className="flex-1 space-y-1 sm:space-y-2 overflow-y-auto max-h-[300px] sm:max-h-[350px]">
        {todos.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500">
            <p className="text-xs sm:text-sm">No tasks in this quadrant</p>
            <p className="text-xs mt-1 hidden sm:block">Drag tasks here to organize them</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={(e) => handleTodoDragStart(e, todo.id)}
              onDragEnd={handleTodoDragEnd}
              className={`bg-white rounded-lg p-3 sm:p-3 border shadow-sm cursor-move hover:shadow-md transition-all duration-200 select-none touch-manipulation min-h-[60px] sm:min-h-auto ${
                todo.completed ? "opacity-60" : ""
              }`}
            >
              {/* Task Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-1">
                  <button
                    onClick={() => handleToggleComplete(todo)}
                    className={`w-6 h-6 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-colors touch-manipulation ${
                      todo.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {todo.completed && <Check size={14} className="sm:w-3 sm:h-3" />}
                  </button>
                  
                  {editingTodo === todo.id ? (
                    <div className="flex-1 flex gap-1">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 px-2 py-1 text-xs sm:text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveEdit(todo.id);
                          if (e.key === "Escape") handleCancelEdit();
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveEdit(todo.id)}
                        className="p-2 sm:p-1 text-green-600 hover:bg-accent hover:text-accent-foreground rounded transition-colors touch-manipulation"
                      >
                        <Check size={16} className="sm:w-3.5 sm:h-3.5" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 sm:p-1 text-red-600 hover:bg-accent hover:text-accent-foreground rounded transition-colors touch-manipulation"
                      >
                        <X size={16} className="sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <h4
                      className={`flex-1 font-medium text-sm sm:text-base truncate ${
                        todo.completed ? "line-through text-gray-500" : "text-gray-900"
                      }`}
                      title={todo.title}
                    >
                      {todo.title}
                    </h4>
                  )}
                </div>
                
                {editingTodo !== todo.id && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleStartEdit(todo)}
                      className="p-2 sm:p-1 text-gray-400 hover:bg-accent hover:text-accent-foreground rounded transition-colors touch-manipulation"
                    >
                      <Edit2 size={14} className="sm:w-3 sm:h-3" />
                    </button>
                    <button
                      onClick={() => onDeleteTodo(todo.id)}
                      className="p-2 sm:p-1 text-gray-400 hover:bg-accent hover:text-accent-foreground rounded transition-colors touch-manipulation"
                    >
                      <Trash2 size={14} className="sm:w-3 sm:h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Task Description */}
              {todo.description && (
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {todo.description}
                </p>
              )}

              {/* Task Metadata */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {/* Priority Badge */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                    {getPriorityText(todo.priority)}
                  </span>
                  
                  {/* Category */}
                  {todo.category && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {todo.category}
                    </span>
                  )}
                </div>
                
                {/* Due Date */}
                {todo.dueDate && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar size={10} />
                    <span>{format(new Date(todo.dueDate), "MMM d")}</span>
                  </div>
                )}
              </div>

              {/* Matrix Scores */}
              <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={10} />
                  <span>U: {todo.urgency}/3</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <span>I: {todo.importance}/3</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}