import { ExternalLink, Play, FileText, BookOpen, MessageSquare, CheckSquare, Download, Code } from "lucide-react";

interface Resource {
  type: "video" | "article" | "documentation" | "course" | "qa" | "assignment" | "pdf";
  title: string;
  description: string;
  url?: string;
  platform?: string;
  duration?: string;
  difficulty?: string;
  content?: string;
}

interface ResourcesSectionProps {
  title: string;
  icon: React.ReactNode;
  resources: Resource[];
  color: "blue" | "purple" | "cyan" | "orange" | "green";
}

const colorClasses = {
  blue: "text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100",
  purple: "text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100",
  cyan: "text-cyan-600 bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
  orange: "text-orange-600 bg-orange-50 border-orange-200 hover:bg-orange-100",
  green: "text-green-600 bg-green-50 border-green-200 hover:bg-green-100",
};

const iconClasses = {
  blue: "text-blue-600",
  purple: "text-purple-600",
  cyan: "text-cyan-600",
  orange: "text-orange-600",
  green: "text-green-600",
};

export default function ResourcesSection({
  title,
  icon,
  resources,
  color,
}: ResourcesSectionProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <span className={iconClasses[color]}>{icon}</span>
        {title}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {resources.map((resource, idx) => (
          <div
            key={idx}
            className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${colorClasses[color]}`}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-slate-900 flex-1 pr-4">{resource.title}</h4>
              {resource.url && (
                <ExternalLink className="w-5 h-5 flex-shrink-0" />
              )}
            </div>

            <p className="text-sm text-slate-700 mb-4">{resource.description}</p>

            {/* Metadata */}
            <div className="flex flex-wrap gap-2 mb-4">
              {resource.platform && (
                <span className="text-xs bg-white px-2 py-1 rounded border border-current opacity-50">
                  {resource.platform}
                </span>
              )}
              {resource.duration && (
                <span className="text-xs bg-white px-2 py-1 rounded border border-current opacity-50">
                  ⏱️ {resource.duration}
                </span>
              )}
              {resource.difficulty && (
                <span className="text-xs bg-white px-2 py-1 rounded border border-current opacity-50 capitalize">
                  📊 {resource.difficulty}
                </span>
              )}
            </div>

            {/* Content Preview */}
            {resource.content && (
              <div className="bg-white rounded p-3 mb-4 text-sm text-slate-700 border border-current border-opacity-20">
                <pre className="whitespace-pre-wrap text-xs font-mono">{resource.content}</pre>
              </div>
            )}

            {/* Action Button */}
            {resource.url && (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-current font-semibold px-4 py-2 rounded border border-current hover:opacity-100 transition-opacity opacity-75 text-sm"
              >
                Open Resource →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
