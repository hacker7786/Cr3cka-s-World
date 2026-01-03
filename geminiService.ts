
import { GoogleGenAI } from "@google/genai";

export const generateReadme = async (repoName: string, description: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional GitHub-style README.md for a repository named "${repoName}". 
      Description: ${description}. 
      Include sections for Introduction, Features, Getting Started, and License. 
      Use Markdown formatting. Don't include markdown backticks around the whole thing, just the content.`,
    });

    return response.text || "Failed to generate README content.";
  } catch (error) {
    console.error("Error generating README:", error);
    return "# " + repoName + "\n\nError generating detailed content. Please try again later.";
  }
};
