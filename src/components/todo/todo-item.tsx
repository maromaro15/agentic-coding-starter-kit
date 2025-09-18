"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  CalendarIcon, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");
  const [editDueDate, setEditDueDate] = useState<Date | undefined>(
    todo.dueDate ? new Date(todo.dueDate) : undefined
  );

  const handleSave = () => {
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      dueDate: editDueDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setEditDueDate(todo.dueDate ? new Date(todo.dueDate) : undefined);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 3: return "bg-destructive/10 text-destructive border-destructive/20";
      case 2: return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 3: return "High";
      case 2: return "Medium";
      default: return "Low";
    }
  };

  const getQuadrantInfo = (quadrant?: string) => {
    switch (quadrant) {
      case "do_first":
        return { label: "Do First", color: "bg-red-100 text-red-800 border-red-200", emoji: "🔥" };
      case "schedule":
        return { label: "Schedule", color: "bg-green-100 text-green-800 border-green-200", emoji: "📅" };
      case "delegate":
        return { label: "Delegate", color: "bg-yellow-100 text-yellow-800 border-yellow-200", emoji: "👥" };
      case "do_later":
        return { label: "Do Later", color: "bg-gray-100 text-gray-800 border-gray-200", emoji: "⏳" };
      default:
        return { label: "Uncategorized", color: "bg-blue-100 text-blue-800 border-blue-200", emoji: "❓" };
    }
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div className={cn(
      "bg-card border rounded-lg p-3 sm:p-6 transition-all duration-300 hover:shadow-lg",
      todo.completed && "opacity-60 bg-muted/50",
      isOverdue && "border-destructive bg-destructive/5"
    )}>
      <div>
        {isEditing ? (
          <div className="space-y-3 sm:space-y-4">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="font-medium h-9 sm:h-10 rounded-md border focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all duration-200 text-sm sm:text-base"
              placeholder="What needs to be done?"
            />
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Add some details to make it clearer..."
              rows={2}
              className="rounded-md border focus:border-ring focus:ring-2 focus:ring-ring/20 resize-none transition-all duration-200 text-sm sm:text-base"
            />
            <div className="flex gap-2 sm:gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className={cn(
                      "justify-start text-left font-normal h-9 sm:h-10 rounded-2xl px-3 sm:px-4 border-2 border hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-xs sm:text-sm touch-manipulation",
                      !editDueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#F4A261]" />
                    <span className="hidden xs:inline">{editDueDate ? format(editDueDate, "PPP") : "📅 Pick a due date"}</span>
                    <span className="xs:hidden">📅 {editDueDate ? format(editDueDate, "MMM d") : "Date"}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl border-2 border-[#E7E5E4] shadow-xl">
                  <Calendar
                    mode="single"
                    selected={editDueDate}
                    onSelect={setEditDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <Button size="default" onClick={handleSave} className="bg-primary hover:bg-primary-hover hover:text-primary-hover-foreground text-primary-foreground font-medium px-3 sm:px-4 py-2 rounded-md transition-all duration-200 text-sm sm:text-base touch-manipulation h-9 sm:h-10">
                <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Save Changes</span>
                <span className="xs:hidden">Save</span>
              </Button>
              <Button size="default" variant="outline" onClick={handleCancel} className="border hover:bg-outline-hover hover:text-outline-hover-foreground font-medium px-3 sm:px-4 py-2 rounded-md transition-all duration-200 text-sm sm:text-base touch-manipulation h-9 sm:h-10">
                <X className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Cancel</span>
                <span className="xs:hidden">Cancel</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={handleToggleComplete}
                className="mt-1 sm:mt-1.5 h-5 w-5 sm:h-6 sm:w-6 rounded-lg border-2 border-[#E7E5E4] data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#F4A261] data-[state=checked]:to-[#E76F51] data-[state=checked]:border-[#F4A261] transition-all duration-200 touch-manipulation"
              />
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-bold text-base sm:text-lg leading-tight mb-1 sm:mb-2",
                  todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                )}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={cn(
                    "text-xs sm:text-sm leading-relaxed font-medium",
                    todo.completed ? "line-through text-muted-foreground" : "text-muted-foreground"
                  )}>
                    {todo.description}
                  </p>
                )}
              </div>
              <div className="flex gap-1 sm:gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  disabled={todo.completed}
                  className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-md hover:bg-accent hover:scale-105 transition-all duration-200 touch-manipulation"
                >
                  <Edit2 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground hover:text-foreground" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(todo.id)}
                  className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-md hover:bg-destructive/10 hover:scale-105 transition-all duration-200 touch-manipulation"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {todo.category && (
                <Badge variant="outline" className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold border-2 border-[#E7E5E4] bg-gradient-to-r from-white to-[#FFF8F0] text-[#4A5568] hover:border-[#F4A261] transition-all duration-200">
                  🏷️ <span className="hidden xs:inline">{todo.category}</span><span className="xs:hidden">{todo.category.substring(0, 3)}</span>
                </Badge>
              )}
              <Badge className={cn("text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold shadow-sm", getPriorityColor(todo.priority))}>
                <span className="hidden xs:inline">{getPriorityLabel(todo.priority)}</span>
                <span className="xs:hidden">{getPriorityLabel(todo.priority).charAt(0)}</span>
              </Badge>
              {todo.matrix_quadrant && (
                <Badge className={cn("text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold shadow-sm flex items-center gap-1", getQuadrantInfo(todo.matrix_quadrant).color)}>
                  {getQuadrantInfo(todo.matrix_quadrant).emoji} 
                  <span className="hidden xs:inline">{getQuadrantInfo(todo.matrix_quadrant).label}</span>
                  <span className="xs:hidden">{getQuadrantInfo(todo.matrix_quadrant).label.split(' ')[0]}</span>
                </Badge>
              )}
              {(todo.urgency !== undefined || todo.importance !== undefined) && (
                <div className="flex gap-1">
                  {todo.urgency !== undefined && (
                    <Badge variant="outline" className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-medium bg-orange-50 text-orange-700 border-orange-200">
                      U: {todo.urgency}/5
                    </Badge>
                  )}
                  {todo.importance !== undefined && (
                    <Badge variant="outline" className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md font-medium bg-purple-50 text-purple-700 border-purple-200">
                      I: {todo.importance}/5
                    </Badge>
                  )}
                </div>
              )}
              {todo.dueDate && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold flex items-center gap-1 sm:gap-1.5",
                    isOverdue 
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  )}
                >
                  <Clock className="h-3 w-3" />
                  <span className="hidden xs:inline">{format(new Date(todo.dueDate), "MMM d")}</span>
                  <span className="xs:hidden">{format(new Date(todo.dueDate), "M/d")}</span>
                  {isOverdue && <span className="hidden xs:inline"> Overdue</span>}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}