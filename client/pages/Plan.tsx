import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Briefcase,
  Code,
  Database,
  Globe,
  Smartphone,
  Cloud,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  AlertCircle,
  Loader2,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  skills: string[];
}

const predefinedRoles: Role[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Build user interfaces with React, TypeScript, and modern CSS",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: ["React", "TypeScript", "CSS", "HTML"],
  },
  {
    id: "backend",
    title: "Backend Developer",
    description:
      "Develop APIs and server-side logic with Node.js and databases",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    skills: ["Node.js", "Python", "SQL", "APIs"],
  },
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    description: "Master both frontend and backend development",
    icon: Globe,
    color: "from-purple-500 to-pink-500",
    skills: ["React", "Node.js", "Databases", "DevOps"],
  },
  {
    id: "mobile",
    title: "Mobile Developer",
    description: "Create mobile apps with React Native or Flutter",
    icon: Smartphone,
    color: "from-orange-500 to-red-500",
    skills: ["React Native", "iOS", "Android", "Mobile UI"],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "Automate deployments and manage cloud infrastructure",
    icon: Cloud,
    color: "from-indigo-500 to-purple-500",
    skills: ["Docker", "AWS", "CI/CD", "Kubernetes"],
  },
  {
    id: "custom",
    title: "Custom Role",
    description: "Paste any job description for a personalized roadmap",
    icon: Briefcase,
    color: "from-gray-500 to-gray-600",
    skills: ["AI-Powered", "Custom", "Personalized"],
  },
];

const levels = [
  {
    value: "beginner",
    label: "Beginner",
    description: "Just starting out, no prior experience",
    icon: "🌱",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Some experience, looking to advance",
    icon: "🚀",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Strong foundation, mastering expert topics",
    icon: "⭐",
  },
];

const intensities = [
  {
    value: "fast-track",
    label: "Fast Track",
    description: "Intensive learning to get hired quickly",
    duration: "4-6 weeks",
    icon: Zap,
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Steady progress with thorough understanding",
    duration: "8-12 weeks",
    icon: Target,
  },
  {
    value: "deep-mastery",
    label: "Deep Mastery",
    description: "Comprehensive learning for expert level",
    duration: "16-24 weeks",
    icon: CheckCircle2,
  },
];

const hours = ["1", "2", "3", "4", "5", "6"];

export default function Plan() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    selectedRole: null as string | null,
    jobDescription: "",
    level: "intermediate" as "beginner" | "intermediate" | "advanced",
    hours: "2",
    intensity: "balanced" as "fast-track" | "balanced" | "deep-mastery",
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Store data for results page
    sessionStorage.setItem("planData", JSON.stringify(formData));

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    navigate("/results");
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.selectedRole || formData.jobDescription.trim();
      case 2:
        return true;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CP</span>
              </div>
              <span className="font-semibold hidden sm:block">CareerPath</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Step {step} of {totalSteps}
              </span>
              <div className="w-24">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {isGenerating ? (
            <div className="text-center py-20">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-ping opacity-25" />
                <div className="absolute inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                AI is crafting your roadmap...
              </h2>
              <p className="text-gray-600">
                Analyzing job requirements and curating the perfect learning
                path
              </p>
            </div>
          ) : (
            <>
              {/* Step 1: Select Role */}
              {step === 1 && (
                <div className="animate-in fade-in duration-300">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-4">
                      <Briefcase className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-semibold text-indigo-700">
                        Step 1
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      What role are you targeting?
                    </h1>
                    <p className="text-lg text-gray-600">
                      Select a career path or paste a job description
                    </p>
                  </div>

                  {/* Predefined Roles Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {predefinedRoles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            selectedRole: role.id,
                            jobDescription: "",
                          })
                        }
                        className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                          formData.selectedRole === role.id
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-indigo-300 bg-white"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-4`}
                        >
                          <role.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">
                          {role.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {role.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {role.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        {formData.selectedRole === role.id && (
                          <div className="absolute top-4 right-4">
                            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="relative py-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-gray-50 text-gray-500 text-sm font-medium">
                        Or paste a job description
                      </span>
                    </div>
                  </div>

                  {/* Job Description Input */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <label className="block font-semibold text-gray-900 mb-3">
                      Job Description
                    </label>
                    <textarea
                      value={formData.jobDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jobDescription: e.target.value,
                          selectedRole: null,
                        })
                      }
                      placeholder="Paste the job description here. Include requirements, responsibilities, and qualifications..."
                      rows={8}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-700"
                    />
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Our AI will analyze this and create a custom learning path
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Skill Level */}
              {step === 2 && (
                <div className="animate-in fade-in duration-300">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-purple-700">
                        Step 2
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      What's your current level?
                    </h1>
                    <p className="text-lg text-gray-600">
                      This helps us tailor the content to your experience
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {levels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            level: level.value as any,
                          })
                        }
                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${
                          formData.level === level.value
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="text-4xl">{level.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-lg text-gray-900">
                              {level.label}
                            </h3>
                            {formData.level === level.value && (
                              <CheckCircle2 className="w-5 h-5 text-purple-600" />
                            )}
                          </div>
                          <p className="text-gray-600 mt-1">
                            {level.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Daily Hours */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <label className="block font-semibold text-gray-900 mb-4">
                      How many hours can you study daily?
                    </label>
                    <div className="grid grid-cols-6 gap-3">
                      {hours.map((hour) => (
                        <button
                          key={hour}
                          onClick={() =>
                            setFormData({ ...formData, hours: hour })
                          }
                          className={`py-4 rounded-xl font-semibold transition-all ${
                            formData.hours === hour
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {hour}h
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      We recommend 2-3 hours daily for optimal progress
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Learning Intensity */}
              {step === 3 && (
                <div className="animate-in fade-in duration-300">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-4">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">
                        Step 3
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                      Choose your learning intensity
                    </h1>
                    <p className="text-lg text-gray-600">
                      How deep do you want to go?
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {intensities.map((intensity) => (
                      <button
                        key={intensity.value}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            intensity: intensity.value as any,
                          })
                        }
                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                          formData.intensity === intensity.value
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-300 bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              formData.intensity === intensity.value
                                ? "bg-green-500"
                                : "bg-gray-100"
                            }`}
                          >
                            <intensity.icon
                              className={`w-6 h-6 ${
                                formData.intensity === intensity.value
                                  ? "text-white"
                                  : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-bold text-lg text-gray-900">
                                {intensity.label}
                              </h3>
                              <span className="text-sm font-medium text-gray-500">
                                {intensity.duration}
                              </span>
                            </div>
                            <p className="text-gray-600">
                              {intensity.description}
                            </p>
                          </div>
                          {formData.intensity === intensity.value && (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Your Learning Plan
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Target Role</span>
                        <span className="font-medium text-gray-900">
                          {formData.selectedRole
                            ? predefinedRoles.find(
                                (r) => r.id === formData.selectedRole,
                              )?.title
                            : "Custom Role"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current Level</span>
                        <span className="font-medium text-gray-900 capitalize">
                          {formData.level}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Daily Commitment</span>
                        <span className="font-medium text-gray-900">
                          {formData.hours} hours/day
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Learning Mode</span>
                        <span className="font-medium text-gray-900">
                          {
                            intensities.find(
                              (i) => i.value === formData.intensity,
                            )?.label
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  {step === totalSteps ? (
                    <>
                      Generate Roadmap
                      <Sparkles className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
