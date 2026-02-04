import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  PlayCircle,
  Lock,
  Clock,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";
import { useState } from "react";

interface Module {
  id: number;
  title: string;
  skills: string[];
  duration: string;
  outcomes: string[];
}

interface CourseSidebarProps {
  modules: Module[];
  currentModuleId: number;
  completedModules: number[];
  onModuleSelect: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseSidebar({
  modules,
  currentModuleId,
  completedModules,
  onModuleSelect,
  isOpen,
  onClose,
}: CourseSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const progress = Math.round((completedModules.length / modules.length) * 100);

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const sections = [
    { id: 1, title: "Getting Started", modules: modules.slice(0, 3) },
    { id: 2, title: "Core Concepts", modules: modules.slice(3, 6) },
    { id: 3, title: "Advanced Topics", modules: modules.slice(6) },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-64px)] w-80 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900">Course Content</h2>
              <button
                onClick={onClose}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span>
                {completedModules.length}/{modules.length} completed
              </span>
              <span className="text-gray-300">•</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          {/* Course Sections */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {sections.map((section) => (
                <div key={section.id} className="mb-2">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="font-semibold text-sm text-gray-900">
                      {section.title}
                    </span>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </button>

                  {expandedSections.includes(section.id) && (
                    <div className="mt-1 space-y-1">
                      {section.modules.map((module, idx) => {
                        const isCompleted = completedModules.includes(
                          module.id,
                        );
                        const isCurrent = module.id === currentModuleId;
                        const isLocked =
                          !isCompleted &&
                          !isCurrent &&
                          !completedModules.includes(module.id - 1) &&
                          module.id > 1;

                        return (
                          <button
                            key={module.id}
                            onClick={() =>
                              !isLocked && onModuleSelect(module.id)
                            }
                            disabled={isLocked}
                            className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                              isCurrent
                                ? "bg-indigo-50 border border-indigo-200"
                                : isCompleted
                                  ? "hover:bg-gray-50"
                                  : isLocked
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="mt-0.5 flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : isCurrent ? (
                                <PlayCircle className="w-5 h-5 text-indigo-600" />
                              ) : isLocked ? (
                                <Lock className="w-5 h-5 text-gray-400" />
                              ) : (
                                <PlayCircle className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium truncate ${
                                  isCurrent
                                    ? "text-indigo-900"
                                    : isCompleted
                                      ? "text-gray-700"
                                      : "text-gray-600"
                                }`}
                              >
                                {module.id}. {module.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {module.duration}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}
