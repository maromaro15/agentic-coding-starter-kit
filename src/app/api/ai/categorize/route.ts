import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const categorizationSchema = z.object({
  category: z.string().describe("The category of the task (e.g., Work, Personal, Health, Shopping, etc.)"),
  priority: z.number().min(1).max(3).describe("Priority level: 1=low, 2=medium, 3=high"),
  reasoning: z.string().describe("Brief explanation of the categorization and priority assignment")
});

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const result = await generateObject({
      model: openai(model),
      schema: categorizationSchema,
      prompt: `Analyze this task and categorize it appropriately:
      
Title: ${title}
Description: ${description || "No description provided"}

Please categorize this task into an appropriate category (like Work, Personal, Health, Shopping, Learning, etc.) and assign a priority level based on urgency and importance. Consider factors like deadlines, impact, and typical task characteristics when assigning priority.`,
    });

    return NextResponse.json({
      category: result.object.category,
      priority: result.object.priority,
      reasoning: result.object.reasoning
    });

  } catch (error) {
    console.error("AI categorization error:", error);
    return NextResponse.json(
      { error: "Failed to categorize task" },
      { status: 500 }
    );
  }
}