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
          to="/video-call"
          className="block px-4 py-2 hover:bg-gray-700 rounded"
        >
          Video Call
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

// import { NavLink } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { FaHome, FaQuestion, FaCommentAlt, FaChalkboardTeacher, FaVideo } from 'react-icons/fa';

// const Sidebar = () => {
//   const { user } = useAuth();

//   return (
//     <div className="w-64 bg-gray-800 text-gray-300 flex flex-col">
//       <div className="p-4 border-b border-gray-700">
//         <h2 className="text-xl font-semibold">Menu</h2>
//       </div>
//       <nav className="flex-1 p-4 space-y-2">
//         <NavLink
//           to="/"
//           className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
//         >
//           <FaHome className="mr-3" />
//           Dashboard
//         </NavLink>
//         <NavLink
//           to="/questions"
//           className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
//         >
//           <FaQuestion className="mr-3" />
//           Questions
//         </NavLink>
//         <NavLink
//           to="/feedback"
//           className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
//         >
//           <FaCommentAlt className="mr-3" />
//           Feedback
//         </NavLink>
//         {user?.role === 'teacher' && (
//           <NavLink
//             to="/teacher"
//             className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
//           >
//             <FaChalkboardTeacher className="mr-3" />
//             Teacher Dashboard
//           </NavLink>
//         )}
//         <NavLink
//           to="/video-call"
//           className={({ isActive }) => `flex items-center p-2 rounded-md ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
//         >
//           <FaVideo className="mr-3" />
//           Video Call
//         </NavLink>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
