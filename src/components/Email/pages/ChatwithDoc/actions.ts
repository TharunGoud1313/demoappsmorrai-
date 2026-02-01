"use server";

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const generateResponse = async (
  prompt: string,
  documentData: string
) => {
 
  try {
    const result = await generateObject({
      model: openai("gpt-3.5-turbo"),
      system: `You are an expert document analyst and content generator. Your role is to analyze document content and generate relevant responses based on user queries.

      The document could be in various formats (PDF, CSV, XLSX, XLS, DOC, DOCX, TXT) and contains important information.
      
      Your responses should:
      - Analyze the document content thoroughly
      - Extract relevant information based on the user's query
      - Provide accurate and contextually appropriate responses
      - Maintain the original meaning and context from the document
      - Format the response in a clear and organized manner
      - Highlight key points and important information
      - Cross-reference information when necessary
      - Be precise and avoid making assumptions not supported by the document
      
      If the document content is not relevant to the query, clearly state this and suggest what kind of information would be more appropriate.
      `,
      prompt: `Document Content: ${documentData}

User Query: ${prompt}

Please analyze the document content and provide a relevant response to the user's query. Focus on extracting and presenting information that directly addresses their question while maintaining accuracy and context from the document.`,
      schema: z.object({
        response: z.string(),
        relevantSections: z.array(z.string()).optional(),
        confidence: z.number().min(0).max(1),
        additionalContext: z.string().optional(),
      }),
    });

    return result.object;
  } catch (e: any) {
    console.error(
      "Error analyzing document and generating response:",
      e.message
    );
    throw new Error("Failed to analyze document and generate response");
  }
};
