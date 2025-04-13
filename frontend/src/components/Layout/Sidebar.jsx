import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaRobot } from "react-icons/fa";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="w-64 bg-gray-800 p-4">
      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className="block px-4 py-2 hover:bg-gray-700 rounded"
        >
          Dashboard
        </Link>
        <Link
          to="/questions"
          className="block px-4 py-2 hover:bg-gray-700 rounded"
        >
          Questions
        </Link>
        <Link
          to="/feedback"
          className="block px-4 py-2 hover:bg-gray-700 rounded"
        >
          Feedback
        </Link>
        {user?.role === "teacher" && (
          <Link
            to="/teacher"
            className="block px-4 py-2 hover:bg-gray-700 rounded"
          >
            Teacher Dashboard
          </Link>
        )}
        <Link
          to="/join"
          className="block px-4 py-2 hover:bg-gray-700 rounded"
        >
          Video Call
        </Link>
        <Link
          to="/category"
          className="block px-4 py-2 hover:bg-gray-700 rounded"
        >
          Category
        </Link>
        <Link
          to="/ai-chat"
          className="block px-4 py-2 hover:bg-gray-700 rounded-md"
        >
          <span className="flex items-center">
            <FaRobot className="mr-2" />
            AI Assistant
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;


