import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface RealLifeExampleProps {
  example?: string;
}

export default function RealLifeExample({ example }: RealLifeExampleProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!example) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 bg-amber-100/50 hover:bg-amber-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-amber-700" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-amber-900">Real-Life Example</h3>
            <p className="text-sm text-amber-700">
              See how this applies in the real world
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-amber-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-amber-600" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-6">
          <div className="prose prose-amber max-w-none">
            <p className="text-gray-800 text-lg leading-relaxed">{example}</p>
          </div>

          {/* Visual Aid */}
          <div className="mt-6 pt-6 border-t border-amber-200">
            <p className="text-sm font-medium text-amber-800 mb-3">
              💡 Key Takeaway:
            </p>
            <p className="text-gray-700 italic">
              Understanding real-world applications helps you remember concepts
              better and prepares you for actual job scenarios.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
