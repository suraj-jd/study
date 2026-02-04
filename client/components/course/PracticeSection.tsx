import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Play,
  Code,
  Trophy,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface PracticeSectionProps {
  module: {
    id: number;
    title: string;
    skills: string[];
    hasPractice?: boolean;
  };
  onComplete: () => void;
}

interface Exercise {
  id: number;
  type: "quiz" | "coding" | "project";
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
}

export default function PracticeSection({
  module,
  onComplete,
}: PracticeSectionProps) {
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  // Demo exercises based on module
  const exercises: Exercise[] = [
    {
      id: 1,
      type: "quiz",
      title: "Knowledge Check",
      description: "Test your understanding with 5 quick questions",
      difficulty: "easy",
      completed: completedExercises.includes(1),
    },
    {
      id: 2,
      type: "coding",
      title: "Hands-on Exercise",
      description:
        "Apply what you've learned with a practical coding challenge",
      difficulty: "medium",
      completed: completedExercises.includes(2),
    },
    {
      id: 3,
      type: "project",
      title: "Mini Project",
      description: "Build a complete feature to solidify your skills",
      difficulty: "medium",
      completed: completedExercises.includes(3),
    },
  ];

  const handleCompleteExercise = (exerciseId: number) => {
    if (!completedExercises.includes(exerciseId)) {
      const updated = [...completedExercises, exerciseId];
      setCompletedExercises(updated);
    }
    setActiveExercise(null);
  };

  const progress = Math.round(
    (completedExercises.length / exercises.length) * 100,
  );
  const allCompleted = completedExercises.length === exercises.length;

  if (activeExercise) {
    const exercise = exercises.find((e) => e.id === activeExercise);
    if (!exercise) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Exercise Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveExercise(null)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Practice
            </button>
            <span className="text-gray-300">|</span>
            <h2 className="font-bold text-gray-900">{exercise.title}</h2>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded font-medium ${
              exercise.difficulty === "easy"
                ? "bg-green-100 text-green-700"
                : exercise.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {exercise.difficulty.charAt(0).toUpperCase() +
              exercise.difficulty.slice(1)}
          </span>
        </div>

        {/* Exercise Content */}
        <div className="p-6">
          {exercise.type === "quiz" && (
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-indigo-900 font-medium mb-2">
                  Question 1 of 5
                </p>
                <p className="text-gray-800">
                  What is the primary purpose of HTML in web development?
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "To style web pages with colors and layouts",
                  "To structure the content of web pages",
                  "To add interactivity to web pages",
                  "To store data on the server",
                ].map((option, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                  >
                    <span className="font-medium text-gray-700">
                      {String.fromCharCode(65 + idx)}.
                    </span>{" "}
                    <span className="text-gray-800">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {exercise.type === "coding" && (
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Challenge:</h3>
                <p className="text-gray-700">
                  Create a simple HTML page with a heading, paragraph, and a
                  button. The button should be styled with a blue background and
                  white text.
                </p>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                  <span className="text-sm text-gray-400">
                    Write your code here
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>
                <textarea
                  className="w-full h-64 bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
                  placeholder="<!DOCTYPE html>\n<html>\n  <!-- Write your code here -->\n</html>"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowHint(!showHint)}
                  className="gap-2"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Button>
                <Button className="gap-2">
                  <Play className="w-4 h-4" />
                  Run Code
                </Button>
              </div>
              {showHint && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    <span className="font-semibold">Hint:</span> Start with the
                    basic HTML structure, then add an {"<h1>"} for the heading,{" "}
                    {"<p>"} for the paragraph, and {"<button>"} for the button.
                    Use the style attribute for styling.
                  </p>
                </div>
              )}
            </div>
          )}

          {exercise.type === "project" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-2">
                  Project: Personal Portfolio Page
                </h3>
                <p className="text-gray-700 mb-4">
                  Build a complete personal portfolio page that showcases your
                  skills. Include sections for About, Projects, and Contact.
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    Requirements:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>Semantic HTML5 structure</li>
                    <li>Navigation menu with smooth scrolling</li>
                    <li>At least one image</li>
                    <li>Contact form with validation</li>
                    <li>Responsive design (mobile-friendly)</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Code className="w-4 h-4" />
                  Start Coding
                </Button>
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View Example
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <Button variant="outline" onClick={() => setActiveExercise(null)}>
            Skip for Now
          </Button>
          <Button
            onClick={() => handleCompleteExercise(exercise.id)}
            className="gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark as Complete
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Practice Exercises
            </h2>
            <p className="text-gray-600 mt-1">
              Complete all exercises to master this module
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-indigo-600">
              {progress}%
            </span>
            <p className="text-sm text-gray-600">Complete</p>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Exercise Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {exercises.map((exercise) => (
          <button
            key={exercise.id}
            onClick={() => setActiveExercise(exercise.id)}
            className={`text-left p-6 border-2 rounded-xl transition-all ${
              exercise.completed
                ? "border-green-200 bg-green-50"
                : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  exercise.completed ? "bg-green-200" : "bg-indigo-100"
                }`}
              >
                {exercise.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-700" />
                ) : exercise.type === "quiz" ? (
                  <AlertCircle className="w-6 h-6 text-indigo-600" />
                ) : exercise.type === "coding" ? (
                  <Code className="w-6 h-6 text-indigo-600" />
                ) : (
                  <Trophy className="w-6 h-6 text-indigo-600" />
                )}
              </div>
              <span
                className={`text-xs px-2 py-1 rounded font-medium ${
                  exercise.difficulty === "easy"
                    ? "bg-green-100 text-green-700"
                    : exercise.difficulty === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {exercise.difficulty}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{exercise.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>
            <div className="flex items-center text-indigo-600 text-sm font-medium">
              {exercise.completed ? "Completed" : "Start Exercise"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </button>
        ))}
      </div>

      {/* Complete Module Button */}
      {allCompleted && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6 text-center">
          <Trophy className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Congratulations!
          </h3>
          <p className="text-gray-700 mb-4">
            You've completed all practice exercises for this module.
          </p>
          <Button onClick={onComplete} size="lg" className="gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Complete Module
          </Button>
        </div>
      )}

      {/* External Practice Platforms */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Additional Practice Platforms
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="https://www.freecodecamp.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">freeCodeCamp</p>
              <p className="text-sm text-gray-600">
                Interactive coding exercises
              </p>
            </div>
          </a>
          <a
            href="https://www.codecademy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Codecademy</p>
              <p className="text-sm text-gray-600">
                Guided tutorials & projects
              </p>
            </div>
          </a>
          <a
            href="https://www.codewars.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
          >
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Codewars</p>
              <p className="text-sm text-gray-600">Coding challenges & katas</p>
            </div>
          </a>
          <a
            href="https://www.hackerrank.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">HackerRank</p>
              <p className="text-sm text-gray-600">
                Interview prep & challenges
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
