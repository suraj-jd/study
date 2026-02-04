import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGeneratePlan, checkAIStatus } from "./routes/generate-plan";
import {
  handleFetchResources,
  generateResourcesWithAI,
  handleGenerateModuleContent,
} from "./routes/resources";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    const aiEnabled = !!process.env.GROQ_API_KEY;
    res.json({
      message: ping,
      status: "ok",
      timestamp: new Date().toISOString(),
      aiEnabled,
      version: "1.0.0",
    });
  });

  // AI Status check
  app.get("/api/ai-status", checkAIStatus);

  // Demo route
  app.get("/api/demo", handleDemo);

  // AI-powered roadmap generation - MAIN FEATURE
  app.post("/api/generate-plan", handleGeneratePlan);

  // Resource fetching - curated database
  app.post("/api/fetch-resources", handleFetchResources);

  // AI-powered resource generation
  app.post("/api/generate-resources", generateResourcesWithAI);

  // AI-powered comprehensive module content generation
  app.post("/api/generate-module-content", handleGenerateModuleContent);

  // Error handling middleware
  app.use(
    (
      err: any,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error("Server error:", err);
      res.status(500).json({
        success: false,
        error: err.message || "Internal server error",
      });
    },
  );

  return app;
}
