import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  FaHome, 
  FaQuestionCircle, 
  FaComments, 
  FaChalkboardTeacher, 
  FaVideo, 
  FaThLarge, 
  FaRobot 
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: FaHome },
    { to: "/questions", label: "Questions", icon: FaQuestionCircle },
    { to: "/feedback", label: "Feedback", icon: FaComments },
    ...(user?.role === "teacher" 
      ? [{ to: "/teacher", label: "Analytics", icon: FaChalkboardTeacher }] 
      : []
    ),
    { to: "/join", label: "Video Call", icon: FaVideo },
    { to: "/category", label: "Categories", icon: FaThLarge },
    { to: "/ai-chat", label: "AI Assistant", icon: FaRobot },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-gray-900 border-r border-gray-800
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            EduConnect
          </h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center px-4 py-3 rounded-lg
                  transition-all duration-300
                  ${active 
                    ? 'bg-blue-700 text-white border-l-4 border-emerald-500' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
                  }
                `}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;


