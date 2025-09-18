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
    priority?: number;
    category?: string;
    urgency?: number;
    importance?: number;
    matrix_quadrant?: "do_first" | "schedule" | "delegate" | "do_later";
    dueDate?: Date;
  }) => Promise<any>;
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
    urgency: number;
    importance: number;
    matrix_quadrant: "do_first" | "schedule" | "delegate" | "do_later";
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAiResult, setShowAiResult] = useState(false);

  const handleAnalyze = async () => {
    if (!title.trim()) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/ai/matrix-categorize", {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setShowAiResult(false);

    try {
      // Call onAdd which will trigger the API call with automatic AI categorization
      const result = await onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        priority: aiSuggestion?.priority,
        category: aiSuggestion?.category,
        urgency: aiSuggestion?.urgency,
        importance: aiSuggestion?.importance,
        matrix_quadrant: aiSuggestion?.matrix_quadrant,
        dueDate,
      });

      // If the API returned AI suggestions, show them
      if (result?.aiSuggestion) {
        setAiSuggestion(result.aiSuggestion);
        setShowAiResult(true);
        
        // Auto-hide the AI result after 5 seconds
        setTimeout(() => {
          setShowAiResult(false);
        }, 5000);
      }

      // Reset form
      setTitle("");
      setDescription("");
      setDueDate(undefined);
      
      // Don't reset aiSuggestion immediately to show the result
      setTimeout(() => {
        setAiSuggestion(null);
      }, 5000);
      
    } catch (error) {
      console.error('Failed to create todo:', error);
    } finally {
      setIsSubmitting(false);
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

  const getQuadrantLabel = (quadrant: "do_first" | "schedule" | "delegate" | "do_later") => {
    switch (quadrant) {
      case "do_first": return "🚨 Do First";
      case "schedule": return "📅 Schedule";
      case "delegate": return "👥 Delegate";
      case "do_later": return "⏰ Do Later";
      default: return "Unknown";
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
              Matrix Analysis
            </Button>
          </div>

          {aiSuggestion && (
            <div className={cn(
              "p-6 bg-muted/50 rounded-lg space-y-4 border transition-all duration-500",
              showAiResult ? "bg-green-50 border-green-200" : ""
            )}>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="rounded-full px-4 py-2 font-medium">
                    {aiSuggestion.category}
                  </Badge>
                  <Badge className={cn("rounded-full px-4 py-2 font-medium", getPriorityColor(aiSuggestion.priority))}>
                    {getPriorityLabel(aiSuggestion.priority)} Priority
                  </Badge>
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                    {getQuadrantLabel(aiSuggestion.matrix_quadrant)}
                  </Badge>
                </div>
                {showAiResult && (
                  <Badge variant="secondary" className="text-xs">
                    ✨ AI Applied
                  </Badge>
                )}
              </div>
              
              {/* Matrix Scores */}
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Urgency:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          "w-3 h-3 rounded-full border",
                          level <= aiSuggestion.urgency
                            ? "bg-red-500 border-red-500"
                            : "bg-gray-200 border-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{aiSuggestion.urgency}/3</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Importance:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          "w-3 h-3 rounded-full border",
                          level <= aiSuggestion.importance
                            ? "bg-blue-500 border-blue-500"
                            : "bg-gray-200 border-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{aiSuggestion.importance}/3</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {aiSuggestion.reasoning}
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12 rounded-md bg-primary hover:bg-primary-hover hover:text-primary-hover-foreground text-primary-foreground font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={!title.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating with AI...
              </>
            ) : (
              'Add Task'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}