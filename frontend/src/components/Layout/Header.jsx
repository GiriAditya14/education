import { useAuth } from "../../context/AuthContext";
import { FaBell, FaUserCircle, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const welcomeRole =
    user?.role === "teacher"
      ? "Educator"
      : user?.role === "student"
      ? "Student"
      : null;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  return (
    <header className="h-16 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        <div className="min-w-0 pr-3">
          {welcomeRole && (
            <h1 className="text-lg sm:text-2xl font-bold truncate leading-tight bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome back, {welcomeRole}!
            </h1>
          )}
        </div>

        {/* Right side - Notifications and User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notification Bell */}
          <button
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Notifications"
          >
            <FaBell className="w-5 h-5" />
            {/* Badge indicator placeholder */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user?.name?.charAt(0).toUpperCase() || <FaUserCircle className="w-6 h-6" />}
              </div>

              {/* User Info */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || "Guest"}
                </p>
              </div>

              {/* Dropdown Icon */}
              <FaChevronDown 
                className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info in Dropdown (mobile) */}
                <div className="md:hidden px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role || "Guest"}
                  </p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
