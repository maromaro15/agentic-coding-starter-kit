"use client";

import { useState, useEffect } from "react";
import { QuadrantCard } from "./quadrant-card";

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

interface MatrixGridProps {
  todos: Todo[];
  onUpdateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  onDeleteTodo: (id: string) => Promise<void>;
}

const quadrantConfig = {
  do_first: {
    title: "Do First",
    subtitle: "Urgent & Important",
    description: "Crisis, emergencies, deadline-driven projects",
    color: "bg-red-50 border-red-200",
    headerColor: "bg-red-100 text-red-800",
    icon: "🚨"
  },
  schedule: {
    title: "Schedule",
    subtitle: "Not Urgent but Important",
    description: "Prevention, planning, development, recreation",
    color: "bg-green-50 border-green-200",
    headerColor: "bg-green-100 text-green-800",
    icon: "📅"
  },
  delegate: {
    title: "Delegate",
    subtitle: "Urgent but Not Important",
    description: "Interruptions, some calls, some emails",
    color: "bg-yellow-50 border-yellow-200",
    headerColor: "bg-yellow-100 text-yellow-800",
    icon: "👥"
  },
  do_later: {
    title: "Do Later",
    subtitle: "Not Urgent & Not Important",
    description: "Time wasters, pleasant activities, trivia",
    color: "bg-gray-50 border-gray-200",
    headerColor: "bg-gray-100 text-gray-800",
    icon: "⏰"
  }
};

export function MatrixGrid({ todos, onUpdateTodo, onDeleteTodo }: MatrixGridProps) {
  const [quadrantTodos, setQuadrantTodos] = useState<{
    do_first: Todo[];
    schedule: Todo[];
    delegate: Todo[];
    do_later: Todo[];
  }>({
    do_first: [],
    schedule: [],
    delegate: [],
    do_later: []
  });

  useEffect(() => {
    const grouped = {
      do_first: todos.filter(todo => todo.matrix_quadrant === "do_first"),
      schedule: todos.filter(todo => todo.matrix_quadrant === "schedule"),
      delegate: todos.filter(todo => todo.matrix_quadrant === "delegate"),
      do_later: todos.filter(todo => todo.matrix_quadrant === "do_later")
    };
    setQuadrantTodos(grouped);
  }, [todos]);

  const handleQuadrantChange = async (todoId: string, newQuadrant: Todo["matrix_quadrant"]) => {
    // Update urgency and importance based on quadrant
    let urgency = 1;
    let importance = 1;
    
    switch (newQuadrant) {
      case "do_first":
        urgency = 3;
        importance = 3;
        break;
      case "schedule":
        urgency = 1;
        importance = 3;
        break;
      case "delegate":
        urgency = 3;
        importance = 1;
        break;
      case "do_later":
        urgency = 1;
        importance = 1;
        break;
    }

    await onUpdateTodo(todoId, {
      matrix_quadrant: newQuadrant,
      urgency,
      importance
    });
  };

  return (
    <div className="w-full h-full p-2 sm:p-4">
      {/* Matrix Header */}
      <div className="mb-4 sm:mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Eisenhower Matrix</h1>
        <p className="text-sm sm:text-base text-gray-600">Organize tasks by urgency and importance</p>
      </div>

      {/* Axis Labels */}
      <div className="relative">
        {/* Importance Axis (Vertical) - Hidden on mobile */}
        <div className="hidden sm:block absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-600">
          IMPORTANCE
        </div>
        
        {/* Urgency Axis (Horizontal) - Hidden on mobile */}
        <div className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-gray-600">
          URGENCY
        </div>

        {/* Mobile Axis Labels */}
        <div className="sm:hidden mb-4">
          <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
            <span>Low Urgency</span>
            <span className="font-medium">URGENCY</span>
            <span>High Urgency</span>
          </div>
          <div className="text-center mb-2">
            <span className="text-xs font-medium text-gray-500">IMPORTANCE</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>High ↑</span>
            <span>Low ↓</span>
          </div>
        </div>

        {/* 2x2 Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-h-[400px] sm:min-h-[450px] max-h-[80vh]">
          {/* Mobile: Show quadrant order indicators */}
          <div className="sm:hidden mb-2 grid grid-cols-2 gap-3 text-xs text-gray-400">
            <div className="text-center">1. Do First</div>
            <div className="text-center">2. Schedule</div>
            <div className="text-center">3. Delegate</div>
            <div className="text-center">4. Eliminate</div>
          </div>
          {/* Top Row: High Importance */}
          <QuadrantCard
            quadrant="do_first"
            config={quadrantConfig.do_first}
            todos={quadrantTodos.do_first}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
            onQuadrantChange={handleQuadrantChange}
          />
          <QuadrantCard
            quadrant="schedule"
            config={quadrantConfig.schedule}
            todos={quadrantTodos.schedule}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
            onQuadrantChange={handleQuadrantChange}
          />
          
          {/* Bottom Row: Low Importance */}
          <QuadrantCard
            quadrant="delegate"
            config={quadrantConfig.delegate}
            todos={quadrantTodos.delegate}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
            onQuadrantChange={handleQuadrantChange}
          />
          <QuadrantCard
            quadrant="do_later"
            config={quadrantConfig.do_later}
            todos={quadrantTodos.do_later}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
            onQuadrantChange={handleQuadrantChange}
          />
        </div>

        {/* Axis Indicators */}
        <div className="absolute -top-4 left-0 text-xs text-gray-500">High</div>
        <div className="absolute -top-4 right-0 text-xs text-gray-500">High</div>
        <div className="absolute -bottom-4 left-0 text-xs text-gray-500">Low</div>
        <div className="absolute -bottom-4 right-0 text-xs text-gray-500">Low</div>
        <div className="absolute -left-4 top-0 text-xs text-gray-500">High</div>
        <div className="absolute -left-4 bottom-0 text-xs text-gray-500">Low</div>
      </div>
    </div>
  );
}