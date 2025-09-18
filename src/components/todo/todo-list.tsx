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
import { LoadingSpinner, SkeletonLoader } from "@/components/ui/loading-spinner";

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: number;
  category?: string;
  urgency?: number;
  importance?: number;
  matrix_quadrant?: "do_first" | "schedule" | "delegate" | "do_later";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

type FilterType = "all" | "active" | "completed" | "overdue" | "do_first" | "schedule" | "delegate" | "do_later";
type SortType = "created" | "priority" | "dueDate" | "title" | "urgency" | "importance" | "quadrant";

export function TodoList({ todos, onUpdate, onDelete, loading = false }: TodoListProps) {
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
        case "do_first":
        case "schedule":
        case "delegate":
        case "do_later":
          if (todo.matrix_quadrant !== filter) return false;
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
        case "urgency":
          return (b.urgency || 0) - (a.urgency || 0);
        case "importance":
          return (b.importance || 0) - (a.importance || 0);
        case "quadrant":
          const quadrantOrder = { "do_first": 4, "schedule": 3, "delegate": 2, "do_later": 1 };
          return (quadrantOrder[b.matrix_quadrant as keyof typeof quadrantOrder] || 0) - 
                 (quadrantOrder[a.matrix_quadrant as keyof typeof quadrantOrder] || 0);
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
    const do_first = todos.filter(t => t.matrix_quadrant === "do_first").length;
    const schedule = todos.filter(t => t.matrix_quadrant === "schedule").length;
    const delegate = todos.filter(t => t.matrix_quadrant === "delegate").length;
    const do_later = todos.filter(t => t.matrix_quadrant === "do_later").length;

    return { total, completed, active, overdue, do_first, schedule, delegate, do_later };
  }, [todos]);

  const getFilterIcon = (filterType: FilterType) => {
    switch (filterType) {
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      case "active": return <Circle className="h-4 w-4" />;
      case "overdue": return <AlertTriangle className="h-4 w-4" />;
      case "do_first": return "🔥";
      case "schedule": return "📅";
      case "delegate": return "👥";
      case "do_later": return "⏳";
      default: return <Filter className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <div className="text-center p-3 sm:p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
          <div className="text-xl sm:text-3xl font-bold text-foreground mb-1">{stats.total}</div>
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">Total Tasks</div>
        </div>
        <div className="text-center p-3 sm:p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
          <div className="text-xl sm:text-3xl font-bold text-blue-600 mb-1">{stats.active}</div>
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">In Progress</div>
        </div>
        <div className="text-center p-3 sm:p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
          <div className="text-xl sm:text-3xl font-bold text-green-600 mb-1">{stats.completed}</div>
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">Completed</div>
        </div>
        <div className="text-center p-3 sm:p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300">
          <div className="text-xl sm:text-3xl font-bold text-destructive mb-1">{stats.overdue}</div>
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">Overdue</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="space-y-3 sm:space-y-6">
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <Input
            placeholder="Search your tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 sm:pl-12 h-9 sm:h-10 rounded-md border focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all duration-300 text-sm sm:text-base"
          />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {(["all", "active", "completed", "overdue"] as FilterType[]).map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(filterType)}
                className="flex items-center gap-1 sm:gap-2 rounded-md px-2 sm:px-4 py-1.5 sm:py-2 h-8 sm:h-10 transition-all duration-200 text-xs sm:text-sm touch-manipulation"
              >
                <span className="text-xs sm:text-sm">{getFilterIcon(filterType)}</span>
                <span className="hidden xs:inline sm:inline">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</span>
                {filterType === "overdue" && stats.overdue > 0 && (
                  <Badge variant="destructive" className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 text-xs rounded-full">
                    {stats.overdue}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Matrix Quadrant Filters */}
        <div className="space-y-2">
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">Matrix Quadrants:</div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {(["do_first", "schedule", "delegate", "do_later"] as FilterType[]).map((quadrant) => {
              const count = stats[quadrant as keyof typeof stats] as number;
              return (
                <Button
                  key={quadrant}
                  variant={filter === quadrant ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(quadrant)}
                  className="flex items-center gap-1 sm:gap-2 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 h-8 sm:h-9 transition-all duration-200 text-xs sm:text-sm touch-manipulation"
                >
                  <span className="text-xs sm:text-sm">{getFilterIcon(quadrant)}</span>
                  <span className="capitalize hidden xs:inline sm:inline">{quadrant.replace('_', ' ')}</span>
                  {count > 0 && (
                    <Badge variant="secondary" className="ml-0.5 sm:ml-1 px-1 sm:px-1.5 py-0.5 text-xs rounded-full">
                      {count}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
          <Select value={sortBy} onValueChange={(value: SortType) => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10 rounded-md border hover:bg-accent hover:text-accent-foreground transition-all duration-300 text-sm sm:text-base">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-md border shadow-lg">
              <SelectItem value="created" className="hover:bg-accent text-sm">Created Date</SelectItem>
              <SelectItem value="priority" className="hover:bg-accent text-sm">Priority</SelectItem>
              <SelectItem value="dueDate" className="hover:bg-accent text-sm">Due Date</SelectItem>
              <SelectItem value="title" className="hover:bg-accent text-sm">Title</SelectItem>
              <SelectItem value="urgency" className="hover:bg-accent text-sm">Urgency</SelectItem>
              <SelectItem value="importance" className="hover:bg-accent text-sm">Importance</SelectItem>
              <SelectItem value="quadrant" className="hover:bg-accent text-sm">Matrix Quadrant</SelectItem>
            </SelectContent>
          </Select>

          {categories.length > 0 && (
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 h-9 sm:h-10 rounded-2xl border hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-rounded text-sm sm:text-base">
                <SelectValue placeholder="Category 🏷️" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-[#E7E5E4] bg-white shadow-xl">
                <SelectItem value="all" className="font-rounded hover:bg-accent hover:text-accent-foreground">🌟 All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="font-rounded hover:bg-accent hover:text-accent-foreground">
                    📂 {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Todo Items */}
      <div className="space-y-4" role="region" aria-label="Task list" aria-live="polite">
        {loading ? (
          // Mobile-optimized skeleton loading
          <div className="space-y-3 sm:space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl sm:rounded-2xl border border-[#E7E5E4] p-3 sm:p-4">
                <SkeletonLoader 
                  lines={2} 
                  showAvatar={false}
                  className="mb-2 sm:mb-3"
                />
                <div className="flex justify-between items-center mt-3 sm:mt-4">
                  <div className="flex gap-2">
                    <div className="h-5 w-12 sm:h-6 sm:w-16 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-5 w-16 sm:h-6 sm:w-20 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gray-200 rounded-md animate-pulse" />
                    <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gray-200 rounded-md animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedTodos.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-[#FEFCE8] to-[#FEF3F2] rounded-3xl border border-[#F4A5A5]/20">
            {searchQuery || filter !== "all" || selectedCategory !== "all" ? (
              <div className="space-y-6">
                <div className="text-6xl mb-4" aria-hidden="true">🔍</div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-[#57534E] font-rounded">No tasks match your search! 🤔</h3>
                  <p className="text-[#78716C] font-rounded">Try adjusting your filters or search terms to find what you're looking for.</p>
                </div>
                <Button
                  variant="outline"
                  size="default"
                  className="mt-6 rounded-2xl px-6 py-3 h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-rounded shadow-lg hover:shadow-xl hover:scale-105"
                  onClick={() => {
                    setSearchQuery("");
                    setFilter("all");
                    setSelectedCategory("all");
                  }}
                  aria-label="Clear all filters and show all tasks"
                >
                  ✨ Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-6xl mb-4" aria-hidden="true">📝</div>
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