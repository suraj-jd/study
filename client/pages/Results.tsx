import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Download,
  Share2,
  CheckCircle2,
  Clock,
  Zap,
  BookOpen,
  Target,
  Sparkles,
  Play,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  Award,
  Star,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
  prerequisites?: string[];
}

interface RoadmapData {
  success: boolean;
  title: string;
  subtitle?: string;
  jobRole?: string;
  careerPath?: string;
  totalWeeks: number;
  totalHours: number;
  skills: string[];
  prerequisites?: string[];
  modules: Module[];
}

export default function Results() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [expandedModules, setExpandedModules] = useState<number[]>([1]);
  const [planData, setPlanData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("planData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setPlanData(parsed);
      generateRoadmap(parsed);
    } else {
      setLoading(false);
      setError("No plan data found. Please create a roadmap first.");
    }
  }, []);

  const generateRoadmap = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      console.log("🚀 Generating roadmap with data:", data);

      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Roadmap generated:", result);

      if (!result.success && !result.modules) {
        throw new Error("Invalid response from server");
      }

      setRoadmap(result);
      sessionStorage.setItem("modules", JSON.stringify(result.modules));
    } catch (err) {
      console.error("❌ Error generating roadmap:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate roadmap",
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const expandAll = () => {
    if (roadmap) {
      setExpandedModules(roadmap.modules.map((m) => m.id));
    }
  };

  const collapseAll = () => {
    setExpandedModules([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-ping opacity-25" />
            <div className="absolute inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            AI is analyzing your job description...
          </h2>
          <p className="text-gray-600 mb-4">
            Creating a personalized learning roadmap just for you
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
            <div
              className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
            <Link to="/plan">
              <Button>Create New Roadmap</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Roadmap Found
          </h2>
          <Link to="/plan">
            <Button>Create Your First Roadmap</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="font-bold text-gray-900 hidden sm:block">
                CareerPath
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => alert("Export feature coming soon!")}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => alert("Share feature coming soon!")}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Success Banner */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">
                AI-Generated Custom Roadmap
              </span>
            </div>

            {/* Job Role Badge */}
            {roadmap.jobRole && (
              <div className="mb-4">
                <Badge className="text-lg px-4 py-2 bg-indigo-100 text-indigo-700">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {roadmap.jobRole}
                </Badge>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {roadmap.title}
            </h1>
            {roadmap.subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                {roadmap.subtitle}
              </p>
            )}

            {/* Prerequisites */}
            {roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Prerequisites:</span>
                {roadmap.prerequisites.map((prereq, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-100 rounded text-gray-700"
                  >
                    {prereq}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span className="text-sm text-gray-600">Duration</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {roadmap.totalWeeks} weeks
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Modules</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {roadmap.modules.length}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Total Hours</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {roadmap.totalHours}h
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <span className="text-sm text-gray-600">Daily Study</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {planData?.hours || "2"}h
              </p>
            </div>
          </div>

          {/* Skills Cloud */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-900">
                Skills You Will Master
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {roadmap.skills.map((skill, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Module Controls */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Learning Path
            </h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={expandAll}>
                Expand All
              </Button>
              <Button variant="ghost" size="sm" onClick={collapseAll}>
                Collapse All
              </Button>
            </div>
          </div>

          {/* Modules List */}
          <div className="space-y-4 mb-12">
            {roadmap.modules.map((module, idx) => (
              <div
                key={module.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full p-6 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-xl text-indigo-600">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 mb-1">
                            {module.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {module.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {module.skills
                              .slice(0, 4)
                              .map((skill, skillIdx) => (
                                <span
                                  key={skillIdx}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Badge variant="outline" className="text-xs">
                            {module.duration}
                          </Badge>
                          {module.estimatedHours && (
                            <span className="text-xs text-gray-500">
                              {module.estimatedHours} hours
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {expandedModules.includes(module.id) ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {expandedModules.includes(module.id) && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-4 space-y-4">
                      {/* Key Topics */}
                      {module.keyTopics && module.keyTopics.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-500" />
                            Key Topics
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {module.keyTopics.map((topic, topicIdx) => (
                              <span
                                key={topicIdx}
                                className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded border border-amber-200"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Learning Outcomes */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          What You Will Learn
                        </h4>
                        <ul className="space-y-2">
                          {module.outcomes.map((outcome, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-gray-700 text-sm"
                            >
                              <span className="text-green-500 mt-0.5">•</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Module Stats */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 pt-2">
                        <span className="flex items-center gap-1">
                          <Play className="w-4 h-4 text-indigo-500" />
                          {module.videoCount} videos
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4 text-purple-500" />
                          {module.exerciseCount} exercises
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="max-w-2xl mx-auto">
              <GraduationCap className="w-16 h-16 mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-indigo-100 mb-8 text-lg">
                Your personalized roadmap is ready. Begin with Module 1 and
                follow the structured path to land your dream job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-gray-100 gap-2 text-lg px-8"
                  onClick={() => {
                    sessionStorage.setItem("currentModule", "1");
                    navigate("/learn");
                  }}
                >
                  Start Learning Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Link to="/plan">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 text-lg px-8"
                  >
                    Create Another Roadmap
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
