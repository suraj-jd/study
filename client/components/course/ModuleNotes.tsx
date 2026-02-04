import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface ModuleNotesProps {
  notes?: string;
}

function parseMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = "";
  let codeLanguage = "";
  let listItems: string[] = [];
  let inList = false;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="list-disc list-inside space-y-2 mb-4 text-gray-700"
        >
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>,
      );
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Code block handling
    if (trimmedLine.startsWith("```")) {
      if (!inCodeBlock) {
        flushList();
        inCodeBlock = true;
        codeLanguage = trimmedLine.slice(3).trim();
        codeContent = "";
      } else {
        inCodeBlock = false;
        elements.push(
          <div key={`code-${index}`} className="mb-4">
            <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm rounded-t-lg font-mono">
              {codeLanguage || "code"}
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm font-mono">
              <code>{codeContent.trim()}</code>
            </pre>
          </div>,
        );
        codeLanguage = "";
        codeContent = "";
      }
      return;
    }

    if (inCodeBlock) {
      codeContent += line + "\n";
      return;
    }

    // Headers
    if (trimmedLine.startsWith("# ")) {
      flushList();
      elements.push(
        <h1
          key={`h1-${index}`}
          className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200"
        >
          {trimmedLine.slice(2)}
        </h1>,
      );
      return;
    }

    if (trimmedLine.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={`h2-${index}`}
          className="text-xl font-bold text-gray-900 mt-8 mb-4"
        >
          {trimmedLine.slice(3)}
        </h2>,
      );
      return;
    }

    if (trimmedLine.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${index}`}
          className="text-lg font-semibold text-gray-900 mt-6 mb-3"
        >
          {trimmedLine.slice(4)}
        </h3>,
      );
      return;
    }

    // List items
    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      inList = true;
      listItems.push(trimmedLine.slice(2));
      return;
    } else if (inList && trimmedLine === "") {
      flushList();
      return;
    }

    // Inline code
    if (trimmedLine.includes("`")) {
      flushList();
      const parts = trimmedLine.split(/(`[^`]+`)/);
      elements.push(
        <p key={`p-${index}`} className="text-gray-700 mb-4 leading-relaxed">
          {parts.map((part, idx) => {
            if (part.startsWith("`") && part.endsWith("`")) {
              return (
                <code
                  key={idx}
                  className="bg-gray-100 text-gray-900 px-1.5 py-0.5 rounded text-sm font-mono"
                >
                  {part.slice(1, -1)}
                </code>
              );
            }
            return <span key={idx}>{part}</span>;
          })}
        </p>,
      );
      return;
    }

    // Regular paragraphs
    if (trimmedLine) {
      flushList();
      // Handle bold text
      let processedLine = trimmedLine;
      const boldMatches = processedLine.match(/\*\*([^*]+)\*\*/g);
      if (boldMatches) {
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        boldMatches.forEach((match, idx) => {
          const matchIndex = processedLine.indexOf(match, lastIndex);
          if (matchIndex > lastIndex) {
            parts.push(
              <span key={`text-${idx}-pre`}>
                {processedLine.slice(lastIndex, matchIndex)}
              </span>,
            );
          }
          parts.push(
            <strong key={`bold-${idx}`} className="font-semibold text-gray-900">
              {match.slice(2, -2)}
            </strong>,
          );
          lastIndex = matchIndex + match.length;
        });
        if (lastIndex < processedLine.length) {
          parts.push(
            <span key={`text-end`}>{processedLine.slice(lastIndex)}</span>,
          );
        }
        elements.push(
          <p
            key={`p-bold-${index}`}
            className="text-gray-700 mb-4 leading-relaxed"
          >
            {parts}
          </p>,
        );
      } else {
        elements.push(
          <p key={`p-${index}`} className="text-gray-700 mb-4 leading-relaxed">
            {trimmedLine}
          </p>,
        );
      }
    }
  });

  flushList();
  return elements;
}

export default function ModuleNotes({ notes }: ModuleNotesProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (notes) {
      navigator.clipboard.writeText(notes);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!notes) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Notes Coming Soon
        </h3>
        <p className="text-gray-600">
          Detailed notes for this module will be available shortly.
        </p>
      </div>
    );
  }

  const parsedContent = parseMarkdown(notes);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Module Notes
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Notes
            </>
          )}
        </Button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-none">{parsedContent}</div>
      </div>
    </div>
  );
}
