"use client";

import { useState, useMemo } from "react";
import { TodoItem } from "./todo-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter,
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle
} from "lucide-react";

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  category?: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

type FilterType = "all" | "active" | "completed" | "overdue";
type SortType = "created" | "priority" | "dueDate" | "title";

export function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("created");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Set(todos.map(todo => todo.category).filter(Boolean));
    return Array.from(cats) as string[];
  }, [todos]);

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos.filter(todo => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!todo.title.toLowerCase().includes(query) && 
            !todo.description?.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Status filter
      switch (filter) {
        case "active":
          if (todo.completed) return false;
          break;
        case "completed":
          if (!todo.completed) return false;
          break;
        case "overdue":
          if (todo.completed || !todo.dueDate || new Date(todo.dueDate) >= new Date()) {
            return false;
          }
          break;
      }

      // Category filter
      if (selectedCategory !== "all" && todo.category !== selectedCategory) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          return b.priority - a.priority;
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "created":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [todos, searchQuery, filter, sortBy, selectedCategory]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    const overdue = todos.filter(t => 
      !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    ).length;

    return { total, completed, active, overdue };
  }, [todos]);

  const getFilterIcon = (filterType: FilterType) => {
    switch (filterType) {
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      case "active": return <Circle className="h-4 w-4" />;
      case "overdue": return <AlertTriangle className="h-4 w-4" />;
      default: return <Filter className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
          <div className="text-3xl font-bold text-foreground mb-1">{stats.total}</div>
          <div className="text-sm font-medium text-muted-foreground">Total Tasks</div>
        </div>
        <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
          <div className="text-3xl font-bold text-blue-600 mb-1">{stats.active}</div>
          <div className="text-sm font-medium text-muted-foreground">In Progress</div>
        </div>
        <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
          <div className="text-3xl font-bold text-green-600 mb-1">{stats.completed}</div>
          <div className="text-sm font-medium text-muted-foreground">Completed</div>
        </div>
        <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
          <div className="text-3xl font-bold text-destructive mb-1">{stats.overdue}</div>
          <div className="text-sm font-medium text-muted-foreground">Overdue</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search your tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-10 rounded-md border focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all duration-300"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2">
            {(["all", "active", "completed", "overdue"] as FilterType[]).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="flex items-center gap-2 rounded-md px-4 py-2 h-10 transition-all duration-200"
              >
                {getFilterIcon(filterType)}
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === "overdue" && stats.overdue > 0 && (
                  <Badge variant="destructive" className="ml-2 px-2 py-0.5 text-xs rounded-full">
                    {stats.overdue}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={sortBy} onValueChange={(value: SortType) => setSortBy(value)}>
            <SelectTrigger className="w-48 h-10 rounded-md border hover:bg-accent hover:text-accent-foreground transition-all duration-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-md border shadow-lg">
              <SelectItem value="created" className="hover:bg-accent">Created Date</SelectItem>
              <SelectItem value="priority" className="hover:bg-accent">Priority</SelectItem>
              <SelectItem value="dueDate" className="hover:bg-accent">Due Date</SelectItem>
              <SelectItem value="title" className="hover:bg-accent">Title</SelectItem>
            </SelectContent>
          </Select>

          {categories.length > 0 && (
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 h-10 rounded-2xl border-[#E7E5E4] bg-[#FAFAF9] hover:bg-white hover:border-[#E85D75] transition-all duration-300 font-rounded">
                <SelectValue placeholder="Category 🏷️" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-[#E7E5E4] bg-white shadow-xl">
                <SelectItem value="all" className="font-rounded hover:bg-[#FEF3F2]">🌟 All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="font-rounded hover:bg-[#FEF3F2]">
                    📂 {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Todo Items */}
      <div className="space-y-4">
        {filteredAndSortedTodos.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-[#FEFCE8] to-[#FEF3F2] rounded-3xl border border-[#F4A5A5]/20">
            {searchQuery || filter !== "all" || selectedCategory !== "all" ? (
              <div className="space-y-6">
                <div className="text-6xl mb-4">🔍</div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#57534E] font-rounded">No tasks match your search! 🤔</h3>
                  <p className="text-[#78716C] font-rounded">Try adjusting your filters or search terms to find what you're looking for.</p>
                </div>
                <Button
                  variant="outline"
                  size="default"
                  className="mt-6 rounded-2xl px-6 py-3 h-12 border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75] hover:text-white transition-all duration-300 font-rounded shadow-lg hover:shadow-xl hover:scale-105"
                  onClick={() => {
                    setSearchQuery("");
                    setFilter("all");
                    setSelectedCategory("all");
                  }}
                >
                  ✨ Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-6xl mb-4">📝</div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#57534E] font-rounded">Ready to get productive? 🚀</h3>
                  <p className="text-[#78716C] font-rounded">Add your first task above and let's make today amazing!</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          filteredAndSortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}