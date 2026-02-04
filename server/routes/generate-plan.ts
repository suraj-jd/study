import dotenv from "dotenv";
dotenv.config();
import { RequestHandler } from "express";

// Frontend sends FLAT structure, not nested
interface GeneratePlanRequest {
  jobDescription: string;
  selectedRole: string | null;
  level: "beginner" | "intermediate" | "advanced";
  hours: string;
  intensity: "fast-track" | "balanced" | "deep-mastery";
}

interface Module {
  id: number;
  title: string;
  description: string;
  skills: string[];
  duration: string;
  outcomes: string[];
  videoCount: number;
  exerciseCount: number;
  keyTopics?: string[];
  estimatedHours?: number;
}

interface GeneratePlanResponse {
  success: boolean;
  title: string;
  subtitle?: string;
  jobRole: string;
  totalWeeks: number;
  totalHours: number;
  skills: string[];
  modules: Module[];
  error?: string;
}

export const handleGeneratePlan: RequestHandler = async (req, res) => {
  console.log("-----------------------------------------");
  console.log("🏁 PLAN GENERATION STARTED");
  try {
    // Extract FLAT fields from request body
    const { jobDescription, selectedRole, level, hours, intensity } = req.body as GeneratePlanRequest;

    console.log("📥 Request Body:", JSON.stringify({ selectedRole, level, hours, intensity, jdLength: jobDescription?.length || 0 }));

    if (!jobDescription && !selectedRole) {
      console.error("❌ Missing required fields");
      res.status(400).json({
        success: false,
        error: "Job description or role is required",
      });
      return;
    }

    // Force reload env
    dotenv.config({ override: true });

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("❌ OPENROUTER_API_KEY is missing in process.env");
      res.status(500).json({
        success: false,
        error: "OPENROUTER_API_KEY is not configured",
      });
      return;
    }

    // Use defaults if missing
    const effectiveLevel = level || "intermediate";
    const effectiveHours = hours || "2";
    const effectiveIntensity = intensity || "balanced";

    const moduleCount = effectiveIntensity === "fast-track" ? "4-5" : effectiveIntensity === "balanced" ? "5-6" : "6-8";

    const prompt = `You are an expert Career Curriculum Architect. Generate a COMPREHENSIVE JSON syllabus.

Job Role: ${selectedRole || "Specified Career"}
${jobDescription ? `Job Description:\n${jobDescription}` : ""}

Constraints:
Level: ${effectiveLevel}
Daily Study: ${effectiveHours} hours
Intensity: ${effectiveIntensity}

Create a JSON with this EXACT structure (return ONLY the JSON, no markdown):
{
  "title": "Mastering ${selectedRole || "Your Career"}",
  "subtitle": "A comprehensive roadmap to becoming a ${effectiveLevel}-level expert",
  "jobRole": "${selectedRole || "Expert"}",
  "modules": [
    {
      "id": 1,
      "title": "Module Title",
      "description": "Short module summary",
      "skills": ["Skill1", "Skill2"],
      "duration": "Duration in days (e.g. 5 days)",
      "outcomes": ["Outcome 1", "Outcome 2"],
      "videoCount": 3,
      "exerciseCount": 2,
      "estimatedHours": 10
    }
  ]
}

Requirements:
- ${moduleCount} modules total
- Realistic durations based on ${effectiveHours}h daily study
- Video and exercise counts should reflect the content depth
- Return ONLY valid JSON. No markdown backticks.`;

    console.log("📤 Calling OpenRouter API...");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:8080",
        "X-Title": "Fusion Starter",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ OpenRouter API error:", response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("✅ OpenRouter response received");

    const responseText = data.choices?.[0]?.message?.content || "";

    // Attempt parsing
    let planData: any;
    try {
      const cleanText = responseText.replace(/```json\n?|\n?```/g, "").trim();
      planData = JSON.parse(cleanText);
    } catch (parseError) {
      console.log("⚠️ Initial JSON parse failed, trying regex extraction...");
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        planData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to extract valid JSON from AI response.");
      }
    }

    console.log("✅ JSON parsed successfully");

    // Calculate aggregations
    const modules = planData.modules || [];
    const allSkills = Array.from(new Set(modules.flatMap((m: any) => m.skills || [])));

    let totalDays = 0;
    let totalHours = 0;

    modules.forEach((m: any) => {
      const days = parseInt(m.duration?.match(/\d+/)?.[0] || "5");
      totalDays += days;
      totalHours += m.estimatedHours || (days * parseInt(effectiveHours));
    });

    const totalWeeks = Math.ceil(totalDays / 7);

    const apiResponse: GeneratePlanResponse = {
      success: true,
      title: planData.title || `Learning Path for ${selectedRole}`,
      subtitle: planData.subtitle || "Your customized career roadmap",
      jobRole: planData.jobRole || selectedRole || "Custom Focus",
      totalWeeks,
      totalHours,
      skills: allSkills as string[],
      modules: modules as Module[],
    };

    console.log(`📤 Sending response with ${modules.length} modules, ${totalWeeks} weeks total.`);
    res.status(200).json(apiResponse);
    console.log("🏁 PLAN GENERATION COMPLETED SUCCESSFULLY");
  } catch (error) {
    console.error("❌ PLAN GENERATION FAILED:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const checkAIStatus: RequestHandler = (_req, res) => {
  const hasAPIKey = !!process.env.OPENROUTER_API_KEY;
  res.json({
    success: true,
    aiEnabled: hasAPIKey,
    message: hasAPIKey ? "AI is ready" : "Configure OPENROUTER_API_KEY to enable AI",
  });
};
