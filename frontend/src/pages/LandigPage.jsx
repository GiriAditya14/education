import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUserCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaArrowRight,
} from "react-icons/fa";

const LandingPage = () => {
  const { user, logout } = useAuth();

  const features = [
    {
      title: "Real-time Collaboration",
      description:
        "Connect instantly with educators and peers for seamless learning experiences",
      icon: "💬",
      link: "/feedback",
      color: "purple",
    },
    {
      title: "Interactive Q&A",
      description: "Get your questions answered by subject matter experts",
      icon: "❓",
      link: "/questions",
      color: "blue",
    },
    {
      title: "Video Sessions",
      description: "Engage in live learning sessions with screen sharing",
      icon: "🎥",
      link: "/join",
      color: "emerald",
    },
    {
      title: "Explore Categories",
      description: "Dive into a wide range of subjects and courses",
      icon: "🗂️",
      link: "/category",
      color: "amber",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Enhanced Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-gray-800 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
                EduConnect
              </span>
            </Link>

            <nav className="flex items-center space-x-3 sm:space-x-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500 rounded-full transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <FaUserCircle />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 leading-tight">
            Transform Your Learning Experience
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Connect with expert educators through real-time collaboration, interactive Q&A sessions, and live video learning.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 sm:mb-20">
            {user ? (
              <Link
                to="/dashboard"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-lg font-semibold flex items-center justify-center space-x-3 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto"
              >
                <FaUserCircle className="text-2xl" />
                <span>Go to Dashboard</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full text-lg font-semibold flex items-center justify-center space-x-3 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto"
                >
                  <FaUserCircle className="text-2xl" />
                  <span>Create Account</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Enhanced Feature Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10"
              >
                <div className="text-5xl sm:text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                  {feature.description}
                </p>
                {user && (
                  <Link
                    to={feature.link}
                    className={`inline-flex items-center space-x-2 text-${feature.color}-400 hover:text-${feature.color}-300 font-medium transition-colors group-hover:translate-x-1 transform duration-300`}
                  >
                    <span>Explore</span>
                    <FaArrowRight className="text-sm" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} EduConnect Education Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
