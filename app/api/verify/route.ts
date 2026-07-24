import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.KAGGLE_API_TOKEN || process.env.KAGGLE_KEY;
    if (!token) {
      return NextResponse.json(
        { error: "Kaggle API token is missing in .env.local" },
        { status: 401 }
      );
    }

    const genAI = new GoogleGenerativeAI(token);
    // Note: Assuming Gemma 4 is hosted similarly via Google Generative AI or Kaggle models.
    const model = genAI.getGenerativeModel({ model: "gemma-4" });

    const result = await model.generateContent("Hello, world! What is your name?");
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ success: true, response: text });
  } catch (error: any) {
    console.error("Gemma verification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
