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
      "bg-card border rounded-lg p-6 transition-all duration-300 hover:shadow-lg",
      todo.completed && "opacity-60 bg-muted/50",
      isOverdue && "border-destructive bg-destructive/5"
    )}>
      <div>
        {isEditing ? (
          <div className="space-y-4">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="font-medium h-10 rounded-md border focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all duration-200"
              placeholder="What needs to be done?"
            />
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Add some details to make it clearer..."
              rows={3}
              className="rounded-md border focus:border-ring focus:ring-2 focus:ring-ring/20 resize-none transition-all duration-200"
            />
            <div className="flex gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className={cn(
                      "justify-start text-left font-normal h-10 rounded-2xl px-4 border-2 border-[#E7E5E4] hover:border-[#F4A261] hover:bg-[#FFF8F0] transition-all duration-200",
                      !editDueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#F4A261]" />
                    {editDueDate ? format(editDueDate, "PPP") : "📅 Pick a due date"}
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
            <div className="flex gap-3">
              <Button size="default" onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 rounded-md transition-all duration-200">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              <Button size="default" variant="outline" onClick={handleCancel} className="border hover:bg-accent hover:text-accent-foreground font-medium px-4 py-2 rounded-md transition-all duration-200">
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={handleToggleComplete}
                className="mt-1.5 h-6 w-6 rounded-lg border-2 border-[#E7E5E4] data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#F4A261] data-[state=checked]:to-[#E76F51] data-[state=checked]:border-[#F4A261] transition-all duration-200"
              />
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-bold text-lg leading-tight mb-2",
                  todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                )}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className={cn(
                    "text-sm leading-relaxed font-medium",
                    todo.completed ? "line-through text-muted-foreground" : "text-muted-foreground"
                  )}>
                    {todo.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  disabled={todo.completed}
                  className="h-10 w-10 p-0 rounded-md hover:bg-accent hover:scale-105 transition-all duration-200"
                >
                  <Edit2 className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(todo.id)}
                  className="h-10 w-10 p-0 rounded-md hover:bg-destructive/10 hover:scale-105 transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {todo.category && (
                <Badge variant="outline" className="text-xs px-3 py-1.5 rounded-full font-semibold border-2 border-[#E7E5E4] bg-gradient-to-r from-white to-[#FFF8F0] text-[#4A5568] hover:border-[#F4A261] transition-all duration-200">
                  🏷️ {todo.category}
                </Badge>
              )}
              <Badge className={cn("text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm", getPriorityColor(todo.priority))}>
                {getPriorityLabel(todo.priority)}
              </Badge>
              {todo.matrix_quadrant && (
                <Badge className={cn("text-xs px-3 py-1.5 rounded-full font-semibold shadow-sm flex items-center gap-1", getQuadrantInfo(todo.matrix_quadrant).color)}>
                  {getQuadrantInfo(todo.matrix_quadrant).emoji} {getQuadrantInfo(todo.matrix_quadrant).label}
                </Badge>
              )}
              {(todo.urgency !== undefined || todo.importance !== undefined) && (
                <div className="flex gap-1">
                  {todo.urgency !== undefined && (
                    <Badge variant="outline" className="text-xs px-2 py-1 rounded-md font-medium bg-orange-50 text-orange-700 border-orange-200">
                      U: {todo.urgency}/5
                    </Badge>
                  )}
                  {todo.importance !== undefined && (
                    <Badge variant="outline" className="text-xs px-2 py-1 rounded-md font-medium bg-purple-50 text-purple-700 border-purple-200">
                      I: {todo.importance}/5
                    </Badge>
                  )}
                </div>
              )}
              {todo.dueDate && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5",
                    isOverdue 
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  )}
                >
                  <Clock className="h-3 w-3" />
                  {format(new Date(todo.dueDate), "MMM d")}
                  {isOverdue && " Overdue"}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}