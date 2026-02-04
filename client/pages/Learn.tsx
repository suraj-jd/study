import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Play,
  Clock,
  Award,
  BookOpen,
  FileText,
  Download,
  Code,
  Users,
  Star,
  Menu,
  X,
  MoreVertical,
  Check,
  Loader2,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseContent from "@/components/course/CourseContent";
import ModuleNotes from "@/components/course/ModuleNotes";
import VideoPlayer from "@/components/course/VideoPlayer";
import CodeExample from "@/components/course/CodeExample";
import RealLifeExample from "@/components/course/RealLifeExample";
import DownloadableResources from "@/components/course/DownloadableResources";
import PracticeSection from "@/components/course/PracticeSection";
import CourseCompletion from "@/components/course/CourseCompletion";
import CourseSidebar from "@/components/course/CourseSidebar";

interface Module {
  id: number;
  title: string;
  skills: string[];
  duration: string;
  outcomes: string[];
  description?: string;
  videoUrl?: string;
  videoDuration?: string;
  notes?: string;
  codeExample?: string;
  realLifeExample?: string;
  hasDownloadableResources?: boolean;
  hasPractice?: boolean;
}

interface PlanData {
  jobDescription: string;
  selectedRole: string | null;
  level: "beginner" | "intermediate" | "advanced";
  hours: string;
  intensity: "fast-track" | "balanced" | "deep-mastery";
}

// Demo course data with complete structure
const demoCourse = {
  title: "Frontend Development Masterclass",
  subtitle: "From Basics to Professional - Complete Career Path",
  instructor: {
    name: "CareerPath AI",
    avatar: "CP",
    role: "Curriculum Architect",
    students: "10,000+",
    rating: 4.9,
  },
  totalModules: 8,
  totalDuration: "40 hours",
  level: "Beginner to Advanced",
  lastUpdated: "January 2025",
  language: "English",
  description:
    "This comprehensive course takes you from complete beginner to job-ready frontend developer. Each module is carefully designed with practical examples, real-world applications, and hands-on projects.",
  whatYoullLearn: [
    "Master HTML5, CSS3, and modern JavaScript (ES6+)",
    "Build responsive websites with Flexbox and Grid",
    "Create interactive web applications with React",
    "Understand state management and component architecture",
    "Deploy applications to production",
    "Best practices for clean, maintainable code",
  ],
  requirements: [
    "A computer with internet access",
    "No prior programming experience needed",
    "Willingness to practice 2-4 hours daily",
  ],
};

const demoModules: Module[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    skills: ["Web Basics", "How Internet Works", "Dev Tools Setup"],
    duration: "3-4 days",
    outcomes: [
      "Understand how websites work",
      "Set up development environment",
      "Create your first HTML page",
    ],
    description:
      "Welcome to your frontend development journey! In this module, we'll explore the fundamentals of how the web works and set up your development environment for success.",
    videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
    videoDuration: "45 min",
    notes: `# Introduction to Web Development

## What is Web Development?
Web development is the work involved in developing a website for the Internet. It can range from developing a simple single static page of plain text to complex web applications.

## How the Web Works
1. **Client-Server Model**: Your browser (client) requests files from a server
2. **HTTP/HTTPS**: Protocols for transferring data
3. **DNS**: Domain Name System translates URLs to IP addresses
4. **Hosting**: Servers store and serve website files

## Essential Tools
- **Code Editor**: VS Code (recommended)
- **Browser**: Chrome or Firefox with DevTools
- **Version Control**: Git and GitHub
- **Terminal**: Command line basics

## Key Concepts
- **Frontend**: What users see and interact with (HTML, CSS, JavaScript)
- **Backend**: Server-side logic and databases
- **Full Stack**: Both frontend and backend

## Your First Web Page
Every web page starts with HTML. Here's the basic structure:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
\`\`\`

## Next Steps
- Install VS Code
- Set up a project folder
- Create your first HTML file`,
    codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
</head>
<body>
    <header>
        <h1>Welcome to My Portfolio</h1>
        <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main>
        <section id="about">
            <h2>About Me</h2>
            <p>I'm learning web development!</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2025 My Portfolio</p>
    </footer>
</body>
</html>`,
    realLifeExample:
      "Think of a website like a restaurant. The menu (HTML) lists what's available, the decor and presentation (CSS) make it appealing, and the kitchen staff (JavaScript) makes everything interactive and functional. When you visit a website, you're like a customer entering a restaurant - you see the menu, enjoy the ambiance, and interact with the staff to get what you need.",
    hasDownloadableResources: true,
    hasPractice: true,
  },
  {
    id: 2,
    title: "HTML5 Semantic Structure",
    skills: ["Semantic HTML", "Forms", "Accessibility"],
    duration: "4-5 days",
    outcomes: [
      "Build semantic HTML structures",
      "Create accessible forms",
      "Understand SEO basics",
    ],
    description:
      "Master HTML5 semantic elements to create well-structured, accessible, and SEO-friendly web pages. Learn to build forms that users love to interact with.",
    videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
    videoDuration: "52 min",
    notes: `# HTML5 Semantic Structure

## Why Semantic HTML Matters
Semantic HTML uses meaningful tags that describe the content they contain. This improves:
- **Accessibility**: Screen readers can navigate better
- **SEO**: Search engines understand your content
- **Maintainability**: Code is easier to read and update

## Common Semantic Elements

### Document Structure
- \`<header>\` - Page or section header
- \`<nav>\` - Navigation links
- \`<main>\` - Main content (only one per page)
- \`<article>\` - Self-contained content
- \`<section>\` - Thematic grouping
- \`<aside>\` - Sidebar content
- \`<footer>\` - Page or section footer

### Text Content
- \`<h1>\` to \`<h6>\` - Headings (h1 should be unique)
- \`<p>\` - Paragraphs
- \`<ul>\` and \`<ol>\` - Lists
- \`<blockquote>\` - Quotations
- \`<time>\` - Dates and times

## Building Accessible Forms
\`\`\`html
<form>
  <label for="email">Email Address</label>
  <input 
    type="email" 
    id="email" 
    name="email"
    required
    aria-describedby="email-help"
  >
  <small id="email-help">
    We'll never share your email
  </small>
</form>
\`\`\`

## SEO Best Practices
1. Use one \`<h1>\` per page
2. Include meta descriptions
3. Use alt text for images
4. Create descriptive link text`,
    codeExample: `<!-- Before: Non-semantic -->
<div class="header">
  <div class="nav">
    <a href="#">Home</a>
    <a href="#">About</a>
  </div>
</div>
<div class="main-content">
  <div class="article">
    <div class="title">My Blog Post</div>
  </div>
</div>
<div class="footer">Copyright 2025</div>

<!-- After: Semantic HTML5 -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="#" aria-current="page">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <header>
      <h1>My Blog Post</h1>
      <time datetime="2025-01-15">January 15, 2025</time>
    </header>
    <p>Article content here...</p>
  </article>
</main>

<footer>
  <p>&copy; 2025 My Website</p>
</footer>`,
    realLifeExample:
      "Semantic HTML is like organizing a library. Instead of throwing all books into one big pile (using only \`<div>\`), you organize them into sections: Fiction, Non-fiction, Children's books, etc. (using semantic tags like \`<article>\`, \`<nav>\`, \`<aside>\`). This makes it easier for everyone - library visitors (users), librarians (developers), and the catalog system (search engines) - to find and understand what's available.",
    hasDownloadableResources: true,
    hasPractice: true,
  },
  {
    id: 3,
    title: "CSS3 Styling & Layout",
    skills: ["CSS Selectors", "Box Model", "Flexbox", "Grid"],
    duration: "5-6 days",
    outcomes: [
      "Style web pages beautifully",
      "Create flexible layouts",
      "Understand responsive design",
    ],
    description:
      "Transform plain HTML into beautiful, responsive designs. Master CSS selectors, the box model, Flexbox, and CSS Grid to create modern layouts.",
    videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
    videoDuration: "1h 15min",
    notes: `# CSS3 Styling & Layout

## CSS Fundamentals
CSS (Cascading Style Sheets) controls the presentation of HTML elements.

### CSS Syntax
\`\`\`css
selector {
  property: value;
  another-property: value;
}
\`\`\`

## CSS Selectors

### Basic Selectors
- \`*\` - Universal selector (all elements)
- \`element\` - Tag selector (e.g., \`p\`, \`h1\`)
- \`.class\` - Class selector (e.g., \`.button\`)
- \`#id\` - ID selector (e.g., \`#header\`)

### Combinators
- \`A B\` - Descendant (B inside A)
- \`A > B\` - Child (direct children)
- \`A + B\` - Adjacent sibling
- \`A ~ B\` - General sibling

## The Box Model
Every element is a box with:
- **Content** - The actual content
- **Padding** - Space inside the border
- **Border** - The border itself
- **Margin** - Space outside the border

\`\`\`css
.box {
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
  margin: 10px;
  /* Total width = 300 + 40 + 4 + 20 = 364px */
}
\`\`\`

## Flexbox
One-dimensional layout method for rows or columns.

\`\`\`css
.container {
  display: flex;
  justify-content: center; /* Horizontal alignment */
  align-items: center;     /* Vertical alignment */
  gap: 20px;               /* Space between items */
}
\`\`\`

## CSS Grid
Two-dimensional layout for rows AND columns.

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
\`\`\`

## Responsive Design
\`\`\`css
/* Mobile-first approach */
.container {
  width: 100%;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    width: 1000px;
  }
}
\`\`\``,
    codeExample: `/* Modern Card Layout with Flexbox */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 20px;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, basis */
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1a1a1a;
}

.card-description {
  color: #666;
  line-height: 1.6;
}

/* CSS Grid for Gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
}

.gallery-item {
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}`,
    realLifeExample:
      "CSS is like interior design for your house (HTML). The box model is like understanding that every piece of furniture needs space around it (margin), padding inside (like cushions on a sofa), and has boundaries (border). Flexbox is like arranging furniture in a single row or column - perfect for navigation bars or card lists. CSS Grid is like designing an entire floor plan with rows and columns - ideal for photo galleries or dashboard layouts.",
    hasDownloadableResources: true,
    hasPractice: true,
  },
];

export default function Learn() {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>(demoModules);
  const [currentModuleId, setCurrentModuleId] = useState<number>(1);
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"content" | "notes" | "practice">(
    "content",
  );
  const [showCourseCompletion, setShowCourseCompletion] = useState(false);

  useEffect(() => {
    const storedPlanData = sessionStorage.getItem("planData");
    const storedModules = sessionStorage.getItem("modules");

    if (storedPlanData && storedModules) {
      try {
        const parsedPlanData = JSON.parse(storedPlanData);
        const parsedModules = JSON.parse(storedModules);
        setPlanData(parsedPlanData);
        setModules(parsedModules);

        const currentModule = sessionStorage.getItem("currentModule");
        if (currentModule) {
          setCurrentModuleId(parseInt(currentModule));
        }

        const completed = sessionStorage.getItem("completedModules");
        if (completed) {
          setCompletedModules(JSON.parse(completed));
        }
      } catch (error) {
        console.log("Using demo data");
      }
    }
  }, []);

  const [isLoadingContent, setIsLoadingContent] = useState(false);

  useEffect(() => {
    const fetchModuleContent = async () => {
      if (!planData || modules.length === 0) return;

      const currentModule = modules.find(m => m.id === currentModuleId);
      if (!currentModule) return;

      // Check cache first
      const cacheKey = `module_content_${currentModuleId}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        const content = JSON.parse(cached);
        // If current module doesn't have details yet, update it
        if (!currentModule.videoUrl) {
          setModules(prev => prev.map(m =>
            m.id === currentModuleId ? { ...m, ...content } : m
          ));
        }
        return;
      }

      setIsLoadingContent(true);
      try {
        const response = await fetch("/api/generate-module-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moduleTitle: currentModule.title,
            skills: currentModule.skills,
            level: planData.level || "intermediate",
            role: planData.selectedRole || "Developer"
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.content) {
            // Save to cache
            sessionStorage.setItem(cacheKey, JSON.stringify(data.content));

            // Update state
            setModules(prev => prev.map(m =>
              m.id === currentModuleId ? { ...m, ...data.content } : m
            ));
          }
        }
      } catch (error) {
        console.error("Failed to fetch module content", error);
      } finally {
        setIsLoadingContent(false);
      }
    };

    fetchModuleContent();
  }, [currentModuleId, planData]);

  const currentModule =
    modules.find((m) => m.id === currentModuleId) || modules[0];
  const currentIndex = modules.findIndex((m) => m.id === currentModuleId);
  const progress = Math.round((completedModules.length / modules.length) * 100);

  const handleCompleteModule = () => {
    if (!completedModules.includes(currentModuleId)) {
      const updated = [...completedModules, currentModuleId];
      setCompletedModules(updated);
      sessionStorage.setItem("completedModules", JSON.stringify(updated));
    }

    if (currentIndex < modules.length - 1) {
      const nextId = modules[currentIndex + 1].id;
      setCurrentModuleId(nextId);
      sessionStorage.setItem("currentModule", nextId.toString());
    } else {
      setShowCourseCompletion(true);
    }
  };

  const handlePrevModule = () => {
    if (currentIndex > 0) {
      const prevId = modules[currentIndex - 1].id;
      setCurrentModuleId(prevId);
      sessionStorage.setItem("currentModule", prevId.toString());
    }
  };

  const handleNextModule = () => {
    if (currentIndex < modules.length - 1) {
      const nextId = modules[currentIndex + 1].id;
      setCurrentModuleId(nextId);
      sessionStorage.setItem("currentModule", nextId.toString());
    }
  };

  if (showCourseCompletion) {
    return (
      <CourseCompletion
        courseTitle={demoCourse.title}
        completedModules={completedModules.length}
        totalModules={modules.length}
        onRestart={() => {
          setShowCourseCompletion(false);
          setCurrentModuleId(1);
          setCompletedModules([]);
          sessionStorage.removeItem("completedModules");
          sessionStorage.setItem("currentModule", "1");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <header className="glass border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center justify-between h-20 px-4 lg:px-8">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-3 glass rounded-xl lg:hidden text-slate-600 hover:text-indigo-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 hidden sm:block">
                CareerPath
              </span>
            </Link>
            <Separator orientation="vertical" className="h-8 hidden sm:block opacity-20" />
            <div className="hidden lg:flex flex-col">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current Course</span>
              <span className="font-bold text-slate-700 truncate max-w-xs">{demoCourse.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 mr-4">
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Time to complete</span>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>{demoCourse.totalDuration}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 glass py-2 px-4 rounded-2xl">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Progress</div>
                <span className="text-sm font-bold text-slate-700">{progress}%</span>
              </div>
              <Progress value={progress} className="w-24 h-2.5 bg-slate-100" />
            </div>
            <Button variant="ghost" size="icon" className="glass h-12 w-12 rounded-xl text-slate-500 hover:text-indigo-600">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Course Curriculum */}
        <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:flex' : 'hidden md:hidden'}`}>
          <CourseSidebar
            modules={modules}
            currentModuleId={currentModuleId}
            completedModules={completedModules}
            onModuleSelect={(id) => {
              setCurrentModuleId(id);
              sessionStorage.setItem("currentModule", id.toString());
            }}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-h-[calc(100vh-80px)]">
          <ScrollArea className="h-[calc(100vh-80px)]">
            <div className="max-w-6xl mx-auto">
              {/* Video Player Section */}
              <div className="bg-slate-900 aspect-video relative rounded-b-[40px] overflow-hidden shadow-2xl mx-1 md:mx-4 mt-2">
                {isLoadingContent && (
                  <div className="absolute inset-0 z-10 bg-slate-900/90 flex items-center justify-center flex-col gap-6 text-white backdrop-blur-md">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                      <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black tracking-tight mb-2">Generating personalized insights...</p>
                      <p className="text-slate-400 font-medium">Curating resources for current module</p>
                    </div>
                  </div>
                )}
                {currentModule.videoUrl ? (
                  <iframe
                    src={currentModule.videoUrl}
                    title={currentModule.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                    <div className="text-center text-white p-8 glass mx-auto rounded-3xl max-w-sm">
                      <div className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Play className="w-10 h-10 text-indigo-400 fill-indigo-400" />
                      </div>
                      <p className="text-xl font-bold mb-2">Enhancing Curriculum</p>
                      <p className="text-slate-400">Our AI is finalizing the video resources for this specific skill.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content Navigation Tabs */}
              <div className="glass border-y border-white/20 sticky top-0 z-30 mt-8">
                <div className="flex gap-2 px-4 lg:px-8">
                  {[
                    { id: "content", label: "Module Overview", icon: BookOpen },
                    { id: "notes", label: "Study Material", icon: FileText },
                    { id: "practice", label: "Daily Sprint", icon: Code },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-3 px-6 py-6 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id
                        ? "text-indigo-600"
                        : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                      <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-6 right-6 h-1 w-12 bg-indigo-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 lg:p-10">
                <div className="animate-in">
                  {activeTab === "content" && (
                    <CourseContent
                      module={currentModule}
                      course={demoCourse}
                      currentIndex={currentIndex}
                      totalModules={modules.length}
                    />
                  )}

                  {activeTab === "notes" && (
                    <div className="space-y-12">
                      <div className="glass-card p-1">
                        <ModuleNotes notes={currentModule.notes} />
                      </div>
                      <CodeExample
                        code={currentModule.codeExample}
                        language="html"
                        title="Executable SandBox"
                      />
                      <div className="glass-card p-8 bg-indigo-50/30">
                        <h4 className="flex items-center gap-2 text-xl font-black text-slate-900 mb-4">
                          <Lightbulb className="w-6 h-6 text-amber-500" />
                          Real World Application
                        </h4>
                        <RealLifeExample example={currentModule.realLifeExample} />
                      </div>
                      <DownloadableResources
                        moduleId={currentModule.id}
                        moduleTitle={currentModule.title}
                      />
                    </div>
                  )}

                  {activeTab === "practice" && (
                    <PracticeSection
                      module={currentModule}
                      onComplete={handleCompleteModule}
                    />
                  )}
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="border-t border-white/20 glass p-6 lg:p-8 sticky bottom-0 z-30 rounded-t-[40px] shadow-2xl">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                  <Button
                    variant="outline"
                    onClick={handlePrevModule}
                    disabled={currentIndex === 0}
                    className="gap-3 py-7 px-8 rounded-2xl glass font-bold text-lg hover:bg-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                    <span>Previous</span>
                  </Button>

                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
                      {completedModules.includes(currentModuleId) ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200 font-bold px-4 py-1.5 rounded-full flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          Mastered
                        </Badge>
                      ) : (
                        <span className="text-sm font-bold text-slate-500">In Progress</span>
                      )}
                    </div>

                    {!completedModules.includes(currentModuleId) && (
                      <Button onClick={handleCompleteModule} className="btn-primary-gradient py-7 px-10 rounded-2xl font-bold text-lg gap-3 shadow-xl shadow-indigo-500/30">
                        <CheckCircle2 className="w-6 h-6" />
                        {currentIndex === modules.length - 1
                          ? "Finish Journey"
                          : "Unlock Next"}
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleNextModule}
                    disabled={currentIndex === modules.length - 1}
                    className="gap-3 py-7 px-8 rounded-2xl glass font-bold text-lg hover:bg-white"
                  >
                    <span>Next Module</span>
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
