import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Share2,
  Download,
  Linkedin,
  Twitter,
  Award,
  CheckCircle2,
  Star,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Code,
  Users,
} from "lucide-react";

interface CourseCompletionProps {
  courseTitle: string;
  completedModules: number;
  totalModules: number;
  onRestart: () => void;
}

export default function CourseCompletion({
  courseTitle,
  completedModules,
  totalModules,
  onRestart,
}: CourseCompletionProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  // Demo next level courses
  const nextLevelCourses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      description:
        "Master advanced React concepts including hooks, context, and performance optimization",
      duration: "6 weeks",
      level: "Advanced",
      students: "5,000+",
      rating: 4.9,
      image: "react-advanced",
    },
    {
      id: 2,
      title: "Full-Stack Development",
      description:
        "Learn backend development with Node.js, databases, and API design",
      duration: "10 weeks",
      level: "Intermediate",
      students: "8,000+",
      rating: 4.8,
      image: "fullstack",
    },
    {
      id: 3,
      title: "System Design Fundamentals",
      description:
        "Learn to design scalable, reliable, and maintainable systems",
      duration: "8 weeks",
      level: "Advanced",
      students: "3,000+",
      rating: 4.9,
      image: "system-design",
    },
  ];

  // Free resources from popular platforms
  const freeResources = [
    {
      platform: "freeCodeCamp",
      title: "Full Curriculum",
      description: "Comprehensive free coding curriculum",
      url: "https://www.freecodecamp.org",
      icon: Code,
    },
    {
      platform: "MDN Web Docs",
      title: "Web Development Guide",
      description: "Official documentation and tutorials",
      url: "https://developer.mozilla.org",
      icon: BookOpen,
    },
    {
      platform: "YouTube",
      title: "Traversy Media",
      description: "Free web development tutorials",
      url: "https://www.youtube.com/c/TraversyMedia",
      icon: Users,
    },
    {
      platform: "GitHub",
      title: "Awesome Lists",
      description: "Curated lists of resources",
      url: "https://github.com/sindresorhus/awesome",
      icon: ExternalLink,
    },
  ];

  const handleShare = (platform: string) => {
    const text = `I just completed "${courseTitle}" on CareerPath! 🎉 #CareerPath #Learning`;
    const url = window.location.href;

    switch (platform) {
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      default:
        navigator.clipboard.writeText(
          `I just completed "${courseTitle}" on CareerPath!`,
        );
        alert("Copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            You've successfully completed
          </p>
          <p className="text-2xl font-bold text-indigo-600">{courseTitle}</p>
        </div>

        {/* Achievement Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {completedModules}
              </div>
              <p className="text-gray-600">Modules Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-600">Course Progress</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">40h</div>
              <p className="text-gray-600">Total Learning Time</p>
            </div>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Award className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold">
                  Certificate of Completion
                </h2>
                <p className="text-indigo-200">
                  Official CareerPath Credential
                </p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-0">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
          <div className="bg-white/10 rounded-xl p-6 mb-6">
            <p className="text-lg mb-2">This certifies that</p>
            <p className="text-2xl font-bold mb-2">CareerPath Student</p>
            <p className="text-indigo-200 mb-4">has successfully completed</p>
            <p className="text-xl font-semibold">{courseTitle}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 gap-2">
              <Download className="w-4 h-4" />
              Download Certificate
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Achievement
            </Button>
          </div>
        </div>

        {/* Share Options */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Share Your Achievement
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => handleShare("linkedin")}
              className="gap-2"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              onClick={() => handleShare("twitter")}
              className="gap-2"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              onClick={() => handleShare("copy")}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Copy Link
            </Button>
          </div>
        </div>

        {/* Next Level Courses */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Continue Your Journey
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {nextLevelCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white/80" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {course.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{course.duration}</span>
                    <span>{course.students} students</span>
                  </div>
                  <Button className="w-full gap-2">
                    Enroll Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Free Resources */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Explore Free Resources
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {freeResources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <resource.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    {resource.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {resource.description}
                  </p>
                  <p className="text-xs text-indigo-600 mt-1">
                    {resource.platform}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" onClick={onRestart} className="gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Review Course
          </Button>
          <Link to="/plan">
            <Button className="gap-2">
              Start New Course
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
