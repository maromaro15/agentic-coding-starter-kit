"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Sparkles, Loader2, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddTodoProps {
  onAdd: (todo: {
    title: string;
    description?: string;
    priority: number;
    category?: string;
    dueDate?: Date;
  }) => void;
  onCancel?: () => void;
}

export function AddTodo({ onAdd, onCancel }: AddTodoProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{
    category: string;
    priority: number;
    reasoning: string;
  } | null>(null);

  const handleAnalyze = async () => {
    if (!title.trim()) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai/categorize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const result = await response.json();
        setAiSuggestion(result);
      }
    } catch (error) {
      console.error("Failed to analyze task:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority: aiSuggestion?.priority || 1,
      category: aiSuggestion?.category || undefined,
      dueDate,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate(undefined);
    setAiSuggestion(null);
    
    // Close form if onCancel is provided
    if (onCancel) {
      onCancel();
    }
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

  return (
    <div className="w-full">
      {onCancel && (
        <div className="flex justify-end mb-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg h-12 rounded-md border focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all duration-300 font-medium"
            />
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Tell us more about this task (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="rounded-md border focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all duration-300 resize-none font-medium"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal h-12 rounded-md border hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex-1 font-medium",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5" />
                  {dueDate ? format(dueDate, "PPP") : "When is this due?"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-md border shadow-lg">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              type="button"
              variant="outline"
              onClick={handleAnalyze}
              disabled={!title.trim() || isAnalyzing}
              className="h-12 rounded-md border hover:bg-accent hover:text-accent-foreground transition-all duration-300 font-medium"
            >
              {isAnalyzing ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-5 w-5" />
              )}
              AI Analysis
            </Button>
          </div>

          {aiSuggestion && (
            <div className="p-6 bg-muted/50 rounded-lg space-y-4 border">
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="rounded-full px-4 py-2 font-medium">
                  {aiSuggestion.category}
                </Badge>
                <Badge className={cn("rounded-full px-4 py-2 font-medium", getPriorityColor(aiSuggestion.priority))}>
                  {getPriorityLabel(aiSuggestion.priority)} Priority
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {aiSuggestion.reasoning}
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={!title.trim()}
          >
            Add Task
          </Button>
        </form>
      </div>
    </div>
  );
}