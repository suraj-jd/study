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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="mesh-bg-animate" />
        <div className="relative z-10 text-center max-w-lg mx-auto px-4 animate-in">
          <div className="relative w-32 h-32 mx-auto mb-10">
            <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <Sparkles className="w-14 h-14 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            AI is Architecting Your Career...
          </h2>
          <p className="text-xl text-slate-600 mb-8 font-medium">
            Analyzing job requirements and crafting your day-by-day plan.
          </p>
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="mesh-bg-animate" />
        <div className="relative z-10 glass-card p-10 text-center max-w-md mx-auto px-4 shadow-2xl border-white/40">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Oops! Something went wrong</h2>
          <p className="text-slate-600 mb-8 font-medium">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()} variant="outline" className="glass py-6 px-8 rounded-xl font-bold">
              Try Again
            </Button>
            <Link to="/plan">
              <Button className="btn-primary-gradient py-6 px-8 rounded-xl font-bold">
                Create New Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="glass border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                CareerPath
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="glass px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:text-indigo-600 hover:bg-white/50 gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button className="btn-primary-gradient px-6 py-2.5 rounded-xl font-bold gap-2">
                <Share2 className="w-4 h-4" />
                Share Path
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-in">
            <Badge className="mb-6 bg-indigo-100 text-indigo-700 border-indigo-200 py-1.5 px-4 font-semibold">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Your Custom Roadmap is Ready
            </Badge>

            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              Mastering Your Career as a <br />
              <span className="text-indigo-600">{roadmap.jobRole || "Professional"}</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 font-medium">
              {roadmap.subtitle || "A comprehensive day-by-day roadmap to reach your career goals."}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Duration", value: `${roadmap.totalWeeks} weeks`, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Modules", value: roadmap.modules.length, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
                { label: "Total Hours", value: `${roadmap.totalHours}h`, icon: Target, color: "text-green-600", bg: "bg-green-50" },
                { label: "Daily Study", value: `${planData?.hours || "2"}h`, icon: Zap, color: "text-orange-600", bg: "bg-orange-50" },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 flex flex-col items-center justify-center">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-3 shadow-inner`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Cloud */}
          <div className="glass-card p-8 mb-16 animate-in [animation-delay:100ms]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Star className="text-amber-600 w-6 h-6 fill-amber-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Skills You Will Master
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {roadmap.skills.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="px-4 py-2 text-sm font-bold bg-indigo-50 text-indigo-700 border-indigo-100/50 hover:bg-indigo-100 rounded-xl transition-all"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-10 px-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                <TrendingUp className="text-indigo-600 w-8 h-8" />
                Your Learning Path
              </h2>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm" onClick={expandAll} className="glass px-4 font-bold text-slate-600">
                  Expand All
                </Button>
                <Button variant="ghost" size="sm" onClick={collapseAll} className="glass px-4 font-bold text-slate-600">
                  Collapse All
                </Button>
              </div>
            </div>

            <div className="relative space-y-8">
              {/* Timeline Thread */}
              <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent z-0 hidden md:block" />

              {roadmap.modules.map((module, idx) => (
                <div key={module.id} className="relative z-10 animate-in group" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="glass-card overflow-hidden">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full text-left transition-colors"
                    >
                      <div className="flex items-start gap-6 p-8">
                        {/* Module Indicator */}
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-xl ${expandedModules.includes(module.id) ? 'bg-indigo-600 text-white shadow-indigo-500/40' : 'bg-white/80 text-indigo-600 border border-indigo-100'}`}>
                            <span className="font-black text-3xl">{idx + 1}</span>
                          </div>
                          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest px-2 opacity-60">
                            Module
                          </Badge>
                        </div>

                        {/* Module Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-6 mb-4">
                            <div>
                              <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">
                                {module.title}
                              </h3>
                              <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-2xl">
                                {module.description}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2 text-right">
                              <Badge className="bg-white/80 text-indigo-700 border-indigo-100 font-black px-3 py-1 text-sm rounded-lg">
                                {module.duration}
                              </Badge>
                              {module.estimatedHours && (
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                  {module.estimatedHours} Hours
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {module.skills.map((skill, skillIdx) => (
                              <span
                                key={skillIdx}
                                className="text-xs font-bold px-3 py-1 bg-slate-100/50 text-slate-500 rounded-full border border-slate-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${expandedModules.includes(module.id) ? 'bg-slate-900 text-white' : 'glass text-slate-400'}`}>
                            {expandedModules.includes(module.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>
                    </button>

                    {expandedModules.includes(module.id) && (
                      <div className="px-8 pb-8 pt-2 border-t border-white/20 ml-28 animate-in">
                        <div className="grid md:grid-cols-2 gap-10">
                          {/* Outcomes */}
                          <div>
                            <h4 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              What You Will Learn
                            </h4>
                            <ul className="space-y-4">
                              {module.outcomes.map((outcome, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-600 font-semibold text-base">
                                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Stats & Topics */}
                          <div className="space-y-8">
                            {module.keyTopics && (
                              <div>
                                <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                                  <Lightbulb className="w-5 h-5 text-amber-500" />
                                  Key Focus Areas
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {module.keyTopics.map((topic, tIdx) => (
                                    <span key={tIdx} className="text-sm font-bold px-3 py-1.5 glass text-slate-700 rounded-xl">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-8 pt-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 glass flex items-center justify-center rounded-xl">
                                  <Play className="text-indigo-600 w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Videos</div>
                                  <div className="text-xl font-black text-slate-900">{module.videoCount}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 glass flex items-center justify-center rounded-xl">
                                  <Award className="text-purple-600 w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">Tasks</div>
                                  <div className="text-xl font-black text-slate-900">{module.exerciseCount}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative pt-12 animate-in [animation-delay:400ms]">
            <div className="glass shadow-2xl shadow-indigo-500/20 rounded-[40px] p-12 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full -ml-40 -mb-40" />

              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-white/80 rounded-[32px] shadow-xl flex items-center justify-center mx-auto mb-10 rotate-3">
                  <GraduationCap className="w-12 h-12 text-indigo-600" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
                  Ready to begin your journey?
                </h2>
                <p className="text-xl text-slate-600 mb-12 font-medium">
                  Your personalized Roadmap to <span className="font-bold text-indigo-600">{roadmap.jobRole}</span> is complete. Start your first lesson now.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="btn-primary-gradient text-xl px-12 py-8 rounded-3xl gap-3 shadow-2xl shadow-indigo-500/40"
                    onClick={() => {
                      sessionStorage.setItem("currentModule", "1");
                      navigate("/learn");
                    }}
                  >
                    Start Learning
                    <ArrowRight className="w-6 h-6" />
                  </Button>
                  <Link to="/plan">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-xl px-8 py-8 rounded-3xl glass hover:bg-white font-bold"
                    >
                      Create New Plan
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
