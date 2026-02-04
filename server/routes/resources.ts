import { RequestHandler } from "express";
import dotenv from "dotenv";


interface ResourceRequest {
  moduleTitle: string;
  skills: string[];
  level: string;
}

interface Resource {
  type:
  | "video"
  | "article"
  | "documentation"
  | "course"
  | "qa"
  | "exercise"
  | "pdf";
  title: string;
  description: string;
  url: string;
  platform: string;
  duration?: string;
  difficulty?: string;
  isFree: boolean;
  tags: string[];
}

interface ResourceResponse {
  success: boolean;
  moduleTitle: string;
  resources: {
    videos: Resource[];
    articles: Resource[];
    documentation: Resource[];
    courses: Resource[];
    exercises: Resource[];
  };
}

// Curated high-quality resources database
const curatedResources: Record<string, Resource[]> = {
  HTML: [
    {
      type: "video",
      title: "HTML Full Course - Build a Website Tutorial",
      description:
        "Complete HTML tutorial covering all essential elements and best practices",
      url: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
      platform: "YouTube - freeCodeCamp",
      duration: "2:24:00",
      difficulty: "beginner",
      isFree: true,
      tags: ["html", "basics", "tutorial"],
    },
    {
      type: "video",
      title: "HTML5 Semantic Elements Explained",
      description:
        "Deep dive into semantic HTML5 elements for better accessibility and SEO",
      url: "https://www.youtube.com/watch?v=kGW8Dl_kfVs",
      platform: "YouTube - Traversy Media",
      duration: "18:00",
      difficulty: "beginner",
      isFree: true,
      tags: ["html5", "semantic", "accessibility"],
    },
    {
      type: "documentation",
      title: "MDN HTML Documentation",
      description: "Comprehensive official documentation for HTML from Mozilla",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      platform: "MDN Web Docs",
      isFree: true,
      tags: ["html", "reference", "documentation"],
    },
    {
      type: "course",
      title: "Introduction to HTML",
      description: "Interactive HTML course with hands-on exercises",
      url: "https://www.codecademy.com/learn/learn-html",
      platform: "Codecademy",
      duration: "9 hours",
      difficulty: "beginner",
      isFree: true,
      tags: ["html", "interactive", "exercises"],
    },
    {
      type: "article",
      title: "HTML Best Practices for Beginners",
      description: "Essential tips and best practices for writing clean HTML",
      url: "https://github.com/hail2u/html-best-practices",
      platform: "GitHub",
      isFree: true,
      tags: ["html", "best-practices", "guide"],
    },
  ],
  CSS: [
    {
      type: "video",
      title: "CSS Full Course - Complete Guide",
      description:
        "Master CSS from basics to advanced concepts including Flexbox and Grid",
      url: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
      platform: "YouTube - freeCodeCamp",
      duration: "6:30:00",
      difficulty: "beginner",
      isFree: true,
      tags: ["css", "basics", "complete"],
    },
    {
      type: "video",
      title: "CSS Flexbox Tutorial",
      description: "Complete guide to CSS Flexbox layout",
      url: "https://www.youtube.com/watch?v=tXIhZ5yl0WI",
      platform: "YouTube - Web Dev Simplified",
      duration: "23:00",
      difficulty: "beginner",
      isFree: true,
      tags: ["css", "flexbox", "layout"],
    },
    {
      type: "video",
      title: "CSS Grid Tutorial",
      description: "Master CSS Grid layout system",
      url: "https://www.youtube.com/watch?v=EiNiSFIPIQE",
      platform: "YouTube - Web Dev Simplified",
      duration: "28:00",
      difficulty: "intermediate",
      isFree: true,
      tags: ["css", "grid", "layout"],
    },
    {
      type: "documentation",
      title: "CSS Reference - MDN",
      description: "Complete CSS reference and documentation",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      platform: "MDN Web Docs",
      isFree: true,
      tags: ["css", "reference", "documentation"],
    },
    {
      type: "course",
      title: "Learn CSS",
      description: "Interactive CSS course with real-time practice",
      url: "https://www.codecademy.com/learn/learn-css",
      platform: "Codecademy",
      duration: "10 hours",
      difficulty: "beginner",
      isFree: true,
      tags: ["css", "interactive", "exercises"],
    },
    {
      type: "exercise",
      title: "CSS Battle",
      description: "Practice CSS by replicating target designs",
      url: "https://cssbattle.dev/",
      platform: "CSS Battle",
      difficulty: "intermediate",
      isFree: true,
      tags: ["css", "practice", "challenges"],
    },
    {
      type: "article",
      title: "CSS Tricks Complete Guide Series",
      description: "In-depth guides for CSS concepts",
      url: "https://css-tricks.com/guides/",
      platform: "CSS-Tricks",
      isFree: true,
      tags: ["css", "guides", "reference"],
    },
  ],
  JavaScript: [
    {
      type: "video",
      title: "JavaScript Tutorial for Beginners",
      description: "Full JavaScript course covering ES6+ and modern features",
      url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      platform: "YouTube - freeCodeCamp",
      duration: "8:00:00",
      difficulty: "beginner",
      isFree: true,
      tags: ["javascript", "es6", "basics"],
    },
    {
      type: "video",
      title: "JavaScript ES6+ Features",
      description: "Modern JavaScript features explained with examples",
      url: "https://www.youtube.com/watch?v=NCwa_xi0Uuc",
      platform: "YouTube - Traversy Media",
      duration: "32:00",
      difficulty: "intermediate",
      isFree: true,
      tags: ["javascript", "es6", "modern"],
    },
    {
      type: "documentation",
      title: "JavaScript MDN Documentation",
      description: "Complete JavaScript reference and guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      platform: "MDN Web Docs",
      isFree: true,
      tags: ["javascript", "reference", "documentation"],
    },
    {
      type: "course",
      title: "JavaScript Algorithms and Data Structures",
      description:
        "Free course on JavaScript basics and programming fundamentals",
      url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      platform: "freeCodeCamp",
      duration: "300 hours",
      difficulty: "beginner",
      isFree: true,
      tags: ["javascript", "algorithms", "data-structures"],
    },
    {
      type: "exercise",
      title: "JavaScript30",
      description: "Build 30 things in 30 days with vanilla JS",
      url: "https://javascript30.com/",
      platform: "Wes Bos",
      difficulty: "intermediate",
      isFree: true,
      tags: ["javascript", "projects", "practice"],
    },
    {
      type: "article",
      title: "JavaScript.info",
      description: "The Modern JavaScript Tutorial",
      url: "https://javascript.info/",
      platform: "JavaScript.info",
      isFree: true,
      tags: ["javascript", "tutorial", "comprehensive"],
    },
  ],
  React: [
    {
      type: "video",
      title: "React Course - Beginner's Tutorial",
      description: "Complete React tutorial for beginners",
      url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
      platform: "YouTube - freeCodeCamp",
      duration: "12:00:00",
      difficulty: "beginner",
      isFree: true,
      tags: ["react", "hooks", "basics"],
    },
    {
      type: "video",
      title: "React Hooks Tutorial",
      description: "Master React Hooks with practical examples",
      url: "https://www.youtube.com/watch?v=O6P86uwfdR0",
      platform: "YouTube - Web Dev Simplified",
      duration: "45:00",
      difficulty: "intermediate",
      isFree: true,
      tags: ["react", "hooks", "state"],
    },
    {
      type: "documentation",
      title: "React Official Documentation",
      description: "Official React documentation with interactive examples",
      url: "https://react.dev/",
      platform: "React",
      isFree: true,
      tags: ["react", "official", "documentation"],
    },
    {
      type: "course",
      title: "Full React Course",
      description: "Comprehensive React course with projects",
      url: "https://scrimba.com/learn/learnreact",
      platform: "Scrimba",
      duration: "12 hours",
      difficulty: "beginner",
      isFree: true,
      tags: ["react", "interactive", "projects"],
    },
    {
      type: "exercise",
      title: "React Challenges",
      description: "Practice React with hands-on coding challenges",
      url: "https://github.com/alexgurr/react-coding-challenges",
      platform: "GitHub",
      difficulty: "intermediate",
      isFree: true,
      tags: ["react", "challenges", "practice"],
    },
  ],
  "Node.js": [
    {
      type: "video",
      title: "Node.js Full Course",
      description: "Complete Node.js tutorial with Express and MongoDB",
      url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
      platform: "YouTube - freeCodeCamp",
      duration: "7:00:00",
      difficulty: "beginner",
      isFree: true,
      tags: ["nodejs", "express", "backend"],
    },
    {
      type: "documentation",
      title: "Node.js Documentation",
      description: "Official Node.js API documentation",
      url: "https://nodejs.org/en/docs/",
      platform: "Node.js",
      isFree: true,
      tags: ["nodejs", "api", "reference"],
    },
    {
      type: "course",
      title: "Learn Node.js",
      description: "Interactive Node.js course",
      url: "https://www.codecademy.com/learn/learn-node-js",
      platform: "Codecademy",
      duration: "10 hours",
      difficulty: "intermediate",
      isFree: true,
      tags: ["nodejs", "interactive", "exercises"],
    },
  ],
};

// Fallback resources for unknown topics
const getFallbackResources = (skill: string): Resource[] => {
  return [
    {
      type: "video",
      title: `${skill} Tutorial for Beginners`,
      description: `Comprehensive introduction to ${skill}`,
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + " tutorial")}`,
      platform: "YouTube",
      duration: "Varies",
      difficulty: "beginner",
      isFree: true,
      tags: [skill.toLowerCase(), "tutorial"],
    },
    {
      type: "documentation",
      title: `${skill} Documentation`,
      description: `Official documentation and reference for ${skill}`,
      url: `https://www.google.com/search?q=${encodeURIComponent(skill + " documentation")}`,
      platform: "Official Docs",
      isFree: true,
      tags: [skill.toLowerCase(), "documentation"],
    },
    {
      type: "article",
      title: `${skill} Best Practices`,
      description: `Industry best practices for ${skill}`,
      url: "https://dev.to",
      platform: "Dev.to",
      isFree: true,
      tags: [skill.toLowerCase(), "best-practices"],
    },
  ];
};

// Score resources based on relevance to skills
const scoreResource = (resource: Resource, skills: string[]): number => {
  let score = 0;
  const resourceTags = resource.tags.map((t) => t.toLowerCase());

  skills.forEach((skill) => {
    const skillLower = skill.toLowerCase();
    if (resourceTags.includes(skillLower)) score += 2;
    if (resource.title.toLowerCase().includes(skillLower)) score += 1;
    if (resource.description.toLowerCase().includes(skillLower)) score += 1;
  });

  // Prefer free resources
  if (resource.isFree) score += 1;

  return score;
};

export const handleFetchResources: RequestHandler = async (req, res) => {
  try {
    const { moduleTitle, skills, level } = req.body as ResourceRequest;

    console.log("Fetching resources for:", { moduleTitle, skills, level });

    if (!moduleTitle || !skills || !level) {
      return res.status(400).json({
        success: false,
        error: "moduleTitle, skills, and level are required",
      });
    }

    // Collect resources for each skill
    const allResources: Resource[] = [];

    skills.forEach((skill) => {
      const skillResources =
        curatedResources[skill] || getFallbackResources(skill);
      allResources.push(...skillResources);
    });

    // Score and sort resources
    const scoredResources = allResources.map((resource) => ({
      ...resource,
      score: scoreResource(resource, skills),
    }));

    scoredResources.sort((a, b) => b.score - a.score);

    // Filter by difficulty level
    const levelMap: Record<string, string[]> = {
      beginner: ["beginner"],
      intermediate: ["beginner", "intermediate"],
      advanced: ["beginner", "intermediate", "advanced"],
    };

    const allowedDifficulties = levelMap[level] || ["beginner", "intermediate"];

    const filteredResources = scoredResources.filter(
      (r) => !r.difficulty || allowedDifficulties.includes(r.difficulty),
    );

    // Remove duplicates based on URL
    const uniqueResources = filteredResources.filter(
      (resource, index, self) =>
        index === self.findIndex((r) => r.url === resource.url),
    );

    // Categorize resources
    const categorizedResources = {
      videos: uniqueResources.filter((r) => r.type === "video").slice(0, 3),
      articles: uniqueResources.filter((r) => r.type === "article").slice(0, 3),
      documentation: uniqueResources
        .filter((r) => r.type === "documentation")
        .slice(0, 2),
      courses: uniqueResources.filter((r) => r.type === "course").slice(0, 2),
      exercises: uniqueResources
        .filter((r) => r.type === "exercise")
        .slice(0, 2),
    };

    const response: ResourceResponse = {
      success: true,
      moduleTitle,
      resources: categorizedResources,
    };

    console.log("Resources fetched successfully:", {
      total: uniqueResources.length,
      byCategory: {
        videos: categorizedResources.videos.length,
        articles: categorizedResources.articles.length,
        docs: categorizedResources.documentation.length,
        courses: categorizedResources.courses.length,
        exercises: categorizedResources.exercises.length,
      },
    });

    res.json(response);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch resources",
    });
  }
};

// AI-powered resource generation for custom topics
export const generateResourcesWithAI: RequestHandler = async (req, res) => {
  try {
    const { topic, level } = req.body;

    // HOTFIX: Reload env vars
    dotenv.config({ override: true });

    if (!process.env.OPENROUTER_API_KEY) {
      res.status(500).json({
        success: false,
        error: "OPENROUTER_API_KEY is not configured",
      });
      return;
    }

    const prompt = `Generate a JSON array of 5 high-quality free learning resources for ${topic} at ${level} level.

Requirements:
- Mix of videos (YouTube), articles, documentation, and courses
- All resources must be FREE
- Include well-known platforms (freeCodeCamp, MDN, Codecademy, etc.)
- Provide realistic URLs

Return ONLY this JSON structure (no markdown):
[
  {
    "type": "video|article|documentation|course|exercise",
    "title": "Resource Title",
    "description": "Brief description",
    "url": "https://...",
    "platform": "Platform Name",
    "duration": "Duration if applicable",
    "difficulty": "beginner|intermediate|advanced",
    "tags": ["tag1", "tag2"]
  }
]`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
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
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content || "";
    let resources;

    try {
      const cleanText = responseText.replace(/```json\n?|\n?```/g, "").trim();
      resources = JSON.parse(cleanText);
    } catch {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        resources = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response");
      }
    }

    // Categorize resources
    const categorizedResources = {
      videos: resources.filter((r: any) => r.type === "video"),
      articles: resources.filter((r: any) => r.type === "article"),
      documentation: resources.filter((r: any) => r.type === "documentation"),
      courses: resources.filter((r: any) => r.type === "course"),
      exercises: resources.filter((r: any) => r.type === "exercise"),
    };

    res.json({
      success: true,
      topic,
      resources: categorizedResources,
    });
  } catch (error) {
    console.error("Error generating resources with AI:", error);
    res.status(500).json({
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate resources",
    });
  }
};


interface ModuleContentRequest {
  moduleTitle: string;
  skills: string[];
  level: string;
  role: string;
}

export const handleGenerateModuleContent: RequestHandler = async (req, res) => {
  try {
    const { moduleTitle, skills, level, role } = req.body as ModuleContentRequest;

    console.log("🎓 Generating content for:", moduleTitle, skills);

    // HOTFIX: Reload env vars
    dotenv.config({ override: true });

    if (!process.env.OPENROUTER_API_KEY) {
      res.status(500).json({ success: false, error: "OPENROUTER_API_KEY missing" });
      return;
    }

    const prompt = `You are a world-class curriculum designer. Generate COMPREHENSIVE learning content for the module: "${moduleTitle}"

Target Audience: ${level} level ${role}
Skills to cover: ${skills.join(", ")}

Return a JSON object with this EXACT structure (return ONLY valid JSON, no markdown backticks):
{
  "videoUrl": "YouTube embed URL for a highly relevant tutorial (search: '${moduleTitle} tutorial ${level}'). Use format: https://www.youtube.com/embed/VIDEO_ID",
  "videoDuration": "estimated video duration like '15:30'",
  "description": "2-3 sentence overview of this module",
  "notes": "DETAILED markdown study notes (minimum 500 words) with:\n# Main Topic\n## Subtopics\n- Key concepts\n- Definitions\n- Code examples in markdown code blocks\n- Best practices\n- Common pitfalls",
  "codeExample": "Complete working code example (20+ lines) demonstrating the core concept. Include comments.",
  "realLifeExample": "Real-world analogy or use case (2-3 paragraphs) explaining why this matters",
  "practice": [
    {"question": "Multiple choice or short answer question 1", "type": "quiz", "answer": "correct answer"},
    {"question": "Question 2", "type": "quiz", "answer": "answer"},
    {"question": "Coding challenge description", "type": "code", "starterCode": "// starter code here", "solution": "// solution"}
  ],
  "miniProject": {
    "title": "Mini project name",
    "description": "Project description",
    "difficulty": "${level}",
    "estimatedTime": "30-60 minutes",
    "requirements": ["req1", "req2", "req3"],
    "starterCode": "// optional starter code",
    "hints": ["hint1", "hint2"]
  },
  "resources": [
    {"type": "documentation", "title": "Official Docs", "url": "https://..."},
    {"type": "article", "title": "Tutorial Article", "url": "https://..."},
    {"type": "video", "title": "Additional Video", "url": "https://youtube.com/..."},
    {"type": "exercise", "title": "Practice Platform", "url": "https://leetcode.com/... or similar"}
  ]
}

IMPORTANT RULES:
1. videoUrl MUST be a real, popular YouTube tutorial video ID for this topic
2. notes must be comprehensive (500+ words) with proper markdown formatting
3. codeExample must be runnable, well-commented code
4. Include 3-5 practice questions mixing quiz and coding challenges
5. miniProject should be achievable in 30-60 minutes
6. resources should link to real platforms (MDN, freeCodeCamp, LeetCode, etc.)
7. Return ONLY valid JSON, no explanations before or after`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:8080",
        "X-Title": "CareerPath Study",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [{ "role": "user", "content": prompt }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error("API request failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";

    console.log("📝 Raw API response length:", content.length);

    let parsedContent;
    try {
      const cleanJson = content.replace(/```json\n?|\n?```/g, "").trim();
      parsedContent = JSON.parse(cleanJson);
    } catch (e) {
      console.log("⚠️ Initial parse failed, extracting JSON...");
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        parsedContent = JSON.parse(match[0]);
      } else {
        throw new Error("Could not parse AI response");
      }
    }

    console.log("✅ Content generated successfully for:", moduleTitle);
    res.json({ success: true, content: parsedContent });

  } catch (error) {
    console.error("❌ Error generating module content:", error);
    res.status(500).json({ success: false, error: "Failed to generate content" });
  }
};
