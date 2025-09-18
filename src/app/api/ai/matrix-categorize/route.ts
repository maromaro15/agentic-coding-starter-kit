import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const matrixCategorizationSchema = z.object({
  category: z.string().describe("The category of the task (e.g., Work, Personal, Health, Shopping, etc.)"),
  urgency: z.number().min(1).max(3).describe("Urgency level: 1=low (can wait), 2=medium (should be done soon), 3=high (time-sensitive)"),
  importance: z.number().min(1).max(3).describe("Importance level: 1=low (nice to have), 2=medium (contributes to goals), 3=high (critical for success)"),
  matrix_quadrant: z.enum(["do_first", "schedule", "delegate", "do_later"]).describe("Eisenhower Matrix quadrant based on urgency and importance"),
  reasoning: z.string().describe("Brief explanation of the urgency, importance, and quadrant assignment")
});

export async function POST(request: NextRequest) {
  try {
    const { title, description, dueDate } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const model = process.env.GOOGLE_GENERATIVE_AI_MODEL || "gemini-1.5-flash";

    const dueDateInfo = dueDate ? `Due Date: ${new Date(dueDate).toLocaleDateString()}` : "No due date specified";

    const result = await generateObject({
      model: google(model),
      schema: matrixCategorizationSchema,
      prompt: `Analyze this task using the Eisenhower Matrix principle and categorize it:
      
Title: ${title}
Description: ${description || "No description provided"}
${dueDateInfo}

Please analyze this task and determine:

1. URGENCY (1-3): How time-sensitive is this task?
   - 1 (Low): Can wait, no immediate deadline pressure
   - 2 (Medium): Should be done soon, some time pressure
   - 3 (High): Time-sensitive, urgent deadline or immediate action needed

2. IMPORTANCE (1-3): How much does this task contribute to long-term goals and success?
   - 1 (Low): Nice to have, minimal impact on goals
   - 2 (Medium): Contributes to goals, moderate impact
   - 3 (High): Critical for success, major impact on goals

3. MATRIX QUADRANT based on urgency and importance:
   - "do_first": High urgency + High importance (Quadrant 1 - Crisis/Emergency)
   - "schedule": Low urgency + High importance (Quadrant 2 - Important/Strategic)
   - "delegate": High urgency + Low importance (Quadrant 3 - Interruptions/Distractions)
   - "do_later": Low urgency + Low importance (Quadrant 4 - Time Wasters)

Consider factors like:
- Deadlines and time constraints
- Impact on personal/professional goals
- Consequences of delay
- Strategic value vs. operational necessity
- Dependencies on others

Also provide an appropriate category (Work, Personal, Health, etc.) and explain your reasoning.`,
    });

    return NextResponse.json({
      category: result.object.category,
      urgency: result.object.urgency,
      importance: result.object.importance,
      matrix_quadrant: result.object.matrix_quadrant,
      reasoning: result.object.reasoning
    });

  } catch (error) {
    console.error("AI matrix categorization error:", error);
    return NextResponse.json(
      { error: "Failed to categorize task using Eisenhower Matrix" },
      { status: 500 }
    );
  }
}