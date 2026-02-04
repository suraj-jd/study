import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Target,
  Zap,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  Play,
  Star,
  TrendingUp,
  Clock,
  Github,
  Twitter,
  Linkedin,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Demo stats
const stats = [
  { label: "Active Learners", value: "50K+", icon: Users },
  { label: "Job-Ready Courses", value: "200+", icon: BookOpen },
  { label: "Success Rate", value: "94%", icon: TrendingUp },
  { label: "Free Resources", value: "10K+", icon: Award },
];

// Demo featured courses
const featuredCourses = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Master React, TypeScript, and modern web development",
    duration: "8 weeks",
    level: "Beginner",
    students: "12.5K",
    rating: 4.9,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Backend Engineering",
    description: "Node.js, databases, APIs, and system architecture",
    duration: "10 weeks",
    level: "Intermediate",
    students: "8.2K",
    rating: 4.8,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    title: "Full-Stack Mastery",
    description: "Complete web development from frontend to deployment",
    duration: "16 weeks",
    level: "Advanced",
    students: "5.1K",
    rating: 4.9,
    color: "from-purple-500 to-pink-500",
  },
];

// How it works steps
const steps = [
  {
    icon: Target,
    title: "Paste Job Description",
    description:
      "Share the job you want to prepare for or choose from our curated roles",
  },
  {
    icon: Sparkles,
    title: "AI Generates Roadmap",
    description:
      "Our AI analyzes requirements and creates a personalized learning path",
  },
  {
    icon: BookOpen,
    title: "Structured Learning",
    description:
      "Follow daily modules with videos, notes, code examples, and practice",
  },
  {
    icon: Award,
    title: "Get Job-Ready",
    description:
      "Complete the course, earn your certificate, and land your dream job",
  },
];

// Features
const features = [
  {
    icon: Zap,
    title: "AI-Powered Personalization",
    description:
      "Custom learning paths based on your target job and current skill level",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description:
      "Study at your own pace with 1-6 hours daily commitment options",
  },
  {
    icon: CheckCircle2,
    title: "Hands-On Practice",
    description:
      "Real coding exercises, projects, and assignments after every module",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Join thousands of learners, share progress, and get support",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer at Google",
    content:
      "CareerPath transformed my learning. The AI-generated roadmap was exactly what I needed to land my dream job.",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Full-Stack Engineer at Meta",
    content:
      "The structured approach and curated free resources saved me months of confusion. Highly recommended!",
    avatar: "MJ",
  },
  {
    name: "Emily Rodriguez",
    role: "Backend Developer at Amazon",
    content:
      "I went from zero coding experience to a job offer in 4 months. The daily execution plan kept me on track.",
    avatar: "ER",
  },
];

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">CP</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                CareerPath
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/plan"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Create Roadmap
              </Link>
              <a
                href="#courses"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Courses
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                How It Works
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/learn">
                <Button variant="ghost" className="font-medium">
                  My Learning
                </Button>
              </Link>
              <Link to="/plan">
                <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link to="/" className="block py-2 text-gray-600 font-medium">
                Home
              </Link>
              <Link to="/plan" className="block py-2 text-gray-600 font-medium">
                Create Roadmap
              </Link>
              <a
                href="#courses"
                className="block py-2 text-gray-600 font-medium"
              >
                Courses
              </a>
              <a
                href="#how-it-works"
                className="block py-2 text-gray-600 font-medium"
              >
                How It Works
              </a>
              <div className="pt-3 border-t border-gray-200">
                <Link to="/plan" className="block">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700">
                100% Free • Open Source • AI-Powered
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Job Description to{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Career Roadmap
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform any job description into a personalized, structured
              learning path. Free courses, curated resources, and AI-powered
              guidance to land your dream job.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/plan">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6 gap-2"
                >
                  Create Your Roadmap
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Open source</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
              Popular Career Paths
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated roadmaps designed by industry experts to get you job-ready
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Course Header */}
                <div
                  className={`h-32 bg-gradient-to-br ${course.color} relative`}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-gray-900">
                      {course.level}
                    </Badge>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {course.rating}
                    </span>
                  </div>

                  <Link to="/plan">
                    <Button className="w-full gap-2">
                      Start Learning
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/plan">
              <Button variant="outline" size="lg" className="gap-2">
                View All Career Paths
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
              Simple Process
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How CareerPath Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps from job description to your first day of
              learning
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-2xl p-8 h-full border border-gray-200 hover:border-indigo-300 transition-colors">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                    <step.icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div className="text-sm font-bold text-indigo-600 mb-2">
                    Step {idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-100">
                Why Choose Us
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Everything You Need to{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Land Your Dream Job
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We combine AI-powered personalization with expertly curated free
                resources to create the most effective learning experience.
              </p>

              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI-Powered Learning</h3>
                    <p className="text-white/80 text-sm">
                      Personalized to your goals
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium">
                        Skill Analysis Complete
                      </span>
                    </div>
                    <div className="text-sm text-white/70 ml-11">
                      Identified 12 key skills for Frontend Developer role
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="font-medium">Roadmap Generated</span>
                    </div>
                    <div className="text-sm text-white/70 ml-11">
                      8-week structured learning plan created
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4" />
                      </div>
                      <span className="font-medium">Daily Goals Set</span>
                    </div>
                    <div className="text-sm text-white/70 ml-11">
                      Today's task: Complete HTML Basics Module 1
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      94% Success Rate
                    </p>
                    <p className="text-xs text-gray-500">Job placement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
              Success Stories
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Job Seekers
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands who transformed their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Join 50,000+ learners who have transformed their careers. Create
                your personalized roadmap today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/plan">
                  <Button
                    size="lg"
                    className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6 gap-2"
                  >
                    Create Free Roadmap
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 gap-2"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </Button>
              </div>
              <p className="mt-6 text-sm text-indigo-200">
                100% free • No credit card required • Open source
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CP</span>
                </div>
                <span className="font-bold text-xl text-white">CareerPath</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                AI-powered learning platform that transforms job descriptions
                into personalized career roadmaps using free, curated resources.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/plan"
                    className="hover:text-white transition-colors"
                  >
                    Create Roadmap
                  </Link>
                </li>
                <li>
                  <a
                    href="#courses"
                    className="hover:text-white transition-colors"
                  >
                    Career Paths
                  </a>
                </li>
                <li>
                  <Link
                    to="/learn"
                    className="hover:text-white transition-colors"
                  >
                    My Learning
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">
              © 2025 CareerPath. Open source and free forever.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                License
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
