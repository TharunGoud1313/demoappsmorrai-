"use server";

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const generateEmail = async (input: string) => {
  
  try {
    const result = await generateObject({
      model: openai("gpt-4o"),
      system: `You are an expert email copywriter specializing in crafting compelling, professional emails. Your job is to generate high-quality email content based on the user's request. 

      Create emails that are:
      - Well-structured with clear sections (greeting, introduction, body, call-to-action, closing)
      - Professional and engaging with appropriate tone
      - Persuasive with compelling subject lines when needed
      - Optimized for the specific purpose (marketing, sales, newsletters, announcements, etc.)
      - Free of grammatical errors and typos
      - Personalized based on available context
      - Formatted properly for email delivery with appropriate spacing

      Adapt your style based on the specific request, whether it's a formal business email, marketing campaign, newsletter, or personal message.
      `,
      prompt: `Generate a professional email based on the following request: ${input}`,
      schema: z.object({
        subject: z.string(),
        body: z.string(),
      }),
    });

    return result.object;
  } catch (e) {
    console.error("Error generating email content:", e);
    throw new Error("Failed to generate email content");
  }
};
