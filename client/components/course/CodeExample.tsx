import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Play, FileCode } from "lucide-react";

interface CodeExampleProps {
  code?: string;
  language?: string;
  title?: string;
}

export default function CodeExample({
  code,
  language = "html",
  title = "Code Example",
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!code) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
        <FileCode className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Code Example Coming Soon
        </h3>
        <p className="text-gray-600">
          Practical code examples will be added shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <FileCode className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-gray-900">{title}</span>
          <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="gap-1"
          >
            <Play className="w-4 h-4" />
            {showPreview ? "Hide Preview" : "Preview"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-1"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Code Block */}
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>

      {/* Live Preview (for HTML) */}
      {showPreview && language === "html" && (
        <div className="border-t border-gray-200">
          <div className="px-4 py-2 bg-gray-100 text-xs font-medium text-gray-600 uppercase">
            Live Preview
          </div>
          <div className="p-4 bg-white">
            <div
              className="border border-gray-200 rounded-lg p-4"
              dangerouslySetInnerHTML={{ __html: code }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
