import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Users, Award, BookOpen } from "lucide-react";

interface CourseContentProps {
  module: {
    id: number;
    title: string;
    skills: string[];
    duration: string;
    outcomes: string[];
    description?: string;
    videoDuration?: string;
  };
  course: {
    title: string;
    instructor: {
      name: string;
      avatar: string;
      role: string;
      students: string;
      rating: number;
    };
    totalDuration: string;
    level: string;
  };
  currentIndex: number;
  totalModules: number;
}

export default function CourseContent({
  module,
  course,
  currentIndex,
  totalModules,
}: CourseContentProps) {
  return (
    <div className="space-y-8">
      {/* Module Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="font-medium">
            Module {currentIndex + 1} of {totalModules}
          </Badge>
          <Badge variant="outline" className="font-medium">
            <Clock className="w-3 h-3 mr-1" />
            {module.duration}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {module.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {module.description ||
            `In this module, you will master ${module.skills.join(
              ", ",
            )} through comprehensive video lessons, hands-on exercises, and real-world projects.`}
        </p>
      </div>

      {/* Skills Tags */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Skills You&apos;ll Learn
        </h3>
        <div className="flex flex-wrap gap-2">
          {module.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 border border-indigo-200"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          By the end of this module, you will:
        </h3>
        <ul className="space-y-3">
          {module.outcomes.map((outcome, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{outcome}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Course Info */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          About This Course
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {course.instructor.avatar}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {course.instructor.name}
              </p>
              <p className="text-sm text-gray-600">{course.instructor.role}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.instructor.students} students
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  {course.instructor.rating} rating
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Course Level</span>
              <span className="font-medium text-gray-900">{course.level}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Duration</span>
              <span className="font-medium text-gray-900">
                {course.totalDuration}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Lectures</span>
              <span className="font-medium text-gray-900">
                {totalModules} modules
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Overview */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          What&apos;s Included
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {module.videoDuration || "45 min"} video
              </p>
              <p className="text-sm text-gray-600">HD quality lessons</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Detailed notes</p>
              <p className="text-sm text-gray-600">Downloadable PDF</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Code examples</p>
              <p className="text-sm text-gray-600">Ready to use</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Practice exercises</p>
              <p className="text-sm text-gray-600">Hands-on learning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
