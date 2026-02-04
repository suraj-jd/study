import {
  Download,
  FileText,
  BookOpen,
  ExternalLink,
  FileCode,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadableResourcesProps {
  moduleId: number;
  moduleTitle: string;
}

export default function DownloadableResources({
  moduleId,
  moduleTitle,
}: DownloadableResourcesProps) {
  // Demo resources - in production, these would be real files
  const resources = [
    {
      id: 1,
      title: `${moduleTitle} - Complete Notes (PDF)`,
      description:
        "Comprehensive written notes covering all concepts from this module",
      type: "pdf",
      size: "2.4 MB",
      icon: FileText,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: 2,
      title: "Cheat Sheet - Quick Reference",
      description: "One-page reference guide with key commands and syntax",
      type: "pdf",
      size: "856 KB",
      icon: FileCode,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      title: "Practice Exercises Workbook",
      description: "Hands-on exercises with solutions to reinforce learning",
      type: "pdf",
      size: "1.2 MB",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 4,
      title: "Source Code - Starter Files",
      description: "Complete code examples and starter templates",
      type: "zip",
      size: "3.8 MB",
      icon: FileCode,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const handleDownload = (resource: (typeof resources)[0]) => {
    // In production, this would trigger actual file download
    console.log(`Downloading: ${resource.title}`);
    alert(
      `Download started: ${resource.title}\n\nIn production, this will download the actual file.`,
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Download className="w-5 h-5 text-indigo-600" />
          Downloadable Resources
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Access these materials offline for convenient learning
        </p>
      </div>

      {/* Resources List */}
      <div className="divide-y divide-gray-100">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors"
          >
            <div
              className={`w-12 h-12 ${resource.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
            >
              <resource.icon className={`w-6 h-6 ${resource.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 mb-1">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {resource.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="uppercase font-medium">{resource.type}</span>
                <span>•</span>
                <span>{resource.size}</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload(resource)}
              className="flex-shrink-0 gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Additional Learning Materials
        </h3>
        <div className="space-y-2">
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Official Documentation
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Community Forum Discussions
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Related Articles & Tutorials
          </a>
        </div>
      </div>

      {/* Success Tip */}
      <div className="px-6 py-4 bg-green-50 border-t border-green-100">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800">
            <span className="font-semibold">Pro Tip:</span> Download all
            resources before starting the module so you can study offline or
            reference them later without internet access.
          </p>
        </div>
      </div>
    </div>
  );
}
