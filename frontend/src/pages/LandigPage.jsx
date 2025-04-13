import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUserCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import AutoScrollCarousel from "../components/utility/AutoScrollCarousel";

const LandingPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: "Real-time Collaboration",
      description:
        "Connect instantly with educators and peers for seamless learning experiences",
      icon: "💬",
    },
    {
      title: "Interactive Q&A",
      description: "Get your questions answered by subject matter experts",
      icon: "❓",
    },
    {
      title: "Video Sessions",
      description: "Engage in live learning sessions with screen sharing",
      icon: "🎥",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navigation Bar */}
      <header className="bg-gray-800/90 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              EduConnect
            </span>
          </Link>

          <nav className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Interactive Learning Platform
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
          Connect with educators and learners through real-time collaboration,
          Q&A, and video sessions.
        </p>

        <div className="flex justify-center mb-16">
          {user ? (
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 transition-all"
            >
              <FaUserCircle className="text-xl" />
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 transition-all"
            >
              <FaUserCircle />
              <span>Create Account</span>
            </Link>
          )}
        </div>
        {user && (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
              <div className="text-blue-400 text-3xl mb-3">📚</div>
              <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
              <p className="text-gray-400">
                Get help from educators in real-time
              </p>
              <Link
                to="/questions"
                className="mt-4 inline-block text-blue-400 hover:text-blue-300 text-sm"
              >
                View Questions →
              </Link>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
              <div className="text-purple-400 text-3xl mb-3">💬</div>
              <h3 className="text-xl font-semibold mb-2">Provide Feedback</h3>
              <p className="text-gray-400">Rate and review teaching sessions</p>
              <Link
                to="/feedback"
                className="mt-4 inline-block text-purple-400 hover:text-purple-300 text-sm"
              >
                Give Feedback →
              </Link>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all">
              <div className="text-green-400 text-3xl mb-3">🎥</div>
              <h3 className="text-xl font-semibold mb-2">Video Calls</h3>
              <p className="text-gray-400">Interactive learning sessions</p>
              <Link
                to="/video-call"
                className="mt-4 inline-block text-green-400 hover:text-green-300 text-sm"
              >
                Start Call →
              </Link>
            </div>
          </div>
        )}
      </main>
      <AutoScrollCarousel />

      <footer className="bg-gray-800/80 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} EduConnect Education Platform. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { FaUserCircle, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

// const LandingPage = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//       {/* Navigation Bar */}
//       <header className="bg-gray-800/90 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//               EduConnect
//             </span>
//           </Link>

//           <nav className="flex items-center space-x-4">
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
//               >
//                 <FaSignOutAlt />
//                 <span>Logout</span>
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
//               >
//                 <FaSignInAlt />
//                 <span>Login</span>
//               </Link>
//             )}
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//           Interactive Learning Platform
//         </h1>
//         <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
//           Connect with educators and learners through real-time collaboration,
//           Q&A, and video sessions.
//         </p>

//         <div className="flex justify-center mb-16">
//           {user ? (
//             <Link
//               to="/dashboard"
//               className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 transition-all"
//             >
//               <FaUserCircle className="text-xl" />
//               <span>Go to Dashboard</span>
//             </Link>
//           ) : (
//             <Link
//               to="/register"
//               className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 transition-all"
//             >
//               <FaUserCircle />
//               <span>Create Account</span>
//             </Link>
//           )}
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
//           <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
//             <div className="text-blue-400 text-3xl mb-3">📚</div>
//             <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
//             <p className="text-gray-400">
//               Get help from educators in real-time
//             </p>
//             {user && (
//               <Link
//                 to="/questions"
//                 className="mt-4 inline-block text-blue-400 hover:text-blue-300 text-sm"
//               >
//                 View Questions →
//               </Link>
//             )}
//           </div>

//           <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
//             <div className="text-purple-400 text-3xl mb-3">💬</div>
//             <h3 className="text-xl font-semibold mb-2">Provide Feedback</h3>
//             <p className="text-gray-400">Rate and review teaching sessions</p>
//             {user && (
//               <Link
//                 to="/feedback"
//                 className="mt-4 inline-block text-purple-400 hover:text-purple-300 text-sm"
//               >
//                 Give Feedback →
//               </Link>
//             )}
//           </div>

//           <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all">
//             <div className="text-green-400 text-3xl mb-3">🎥</div>
//             <h3 className="text-xl font-semibold mb-2">Video Calls</h3>
//             <p className="text-gray-400">Interactive learning sessions</p>
//             {user && (
//               <Link
//                 to="/video-call"
//                 className="mt-4 inline-block text-green-400 hover:text-green-300 text-sm"
//               >
//                 Start Call →
//               </Link>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800/80 py-6 mt-12">
//         <div className="container mx-auto px-4 text-center text-gray-400">
//           <p>
//             © {new Date().getFullYear()} EduConnect Education Platform. All
//             rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { FaUserCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

// const LandingPage = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//       {/* Navigation Bar */}
//       <header className="bg-gray-800/90 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//               EduConnect
//             </span>
//           </Link>

//           <nav className="flex items-center space-x-4">
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
//               >
//                 <FaSignOutAlt />
//                 <span>Logout</span>
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
//               >
//                 <FaSignInAlt />
//                 <span>Login</span>
//               </Link>
//             )}
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//           Interactive Learning Platform
//         </h1>
//         <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
//           Connect with educators and learners through real-time collaboration, Q&A, and video sessions.
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
//           {!user ? (
//             <>
//               <Link
//                 to="/login"
//                 className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 transition-all"
//               >
//                 <FaSignInAlt />
//                 <span>Get Started</span>
//               </Link>
//               <Link
//                 to="/register"
//                 className="px-8 py-3 border border-gray-600 hover:bg-gray-800 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 transition-all"
//               >
//                 <FaUserCircle />
//                 <span>Create Account</span>
//               </Link>
//             </>
//           ) : (
//             <Link
//               to="/dashboard"
//               className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 transition-all"
//             >
//               <FaUserCircle className="text-xl" />
//               <span>Go to Dashboard</span>
//             </Link>
//           )}
//         </div>

//         {/* Features Grid */}
// <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
//   <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
//     <div className="text-blue-400 text-3xl mb-3">📚</div>
//     <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
//     <p className="text-gray-400">Get help from educators in real-time</p>
//   </div>

//   <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
//     <div className="text-purple-400 text-3xl mb-3">💬</div>
//     <h3 className="text-xl font-semibold mb-2">Provide Feedback</h3>
//     <p className="text-gray-400">Rate and review teaching sessions</p>
//   </div>

//   <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all">
//     <div className="text-green-400 text-3xl mb-3">🎥</div>
//     <h3 className="text-xl font-semibold mb-2">Video Calls</h3>
//     <p className="text-gray-400">Interactive learning sessions</p>
//   </div>
// </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800/80 py-6 mt-12">
//         <div className="container mx-auto px-4 text-center text-gray-400">
//           <p>© {new Date().getFullYear()} EduConnect Education Platform. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { FaUserCircle, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

// const LandingPage = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
//       {/* Navigation Bar */}
//       <header className="bg-gray-800/90 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//               EduConnect
//             </span>
//           </Link>

//           <nav className="flex items-center space-x-4">
//             {user ? (
//               <div className="flex items-center space-x-6">
//                 <Link
//                   to="/dashboard"
//                   className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
//                 >
//                   <FaUserCircle className="text-xl" />
//                   <span className="hidden md:inline">{user.name}</span>
//                 </Link>
//                 <button
//                   onClick={logout}
//                   className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md flex items-center space-x-1 transition-colors"
//                 >
//                   <span>Logout</span>
//                 </button>
//               </div>
//             ) : (
//               <div className="flex space-x-3">
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md flex items-center space-x-1 transition-colors"
//                 >
//                   <FaSignInAlt />
//                   <span>Login</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md flex items-center space-x-1 transition-colors"
//                 >
//                   <FaUserPlus />
//                   <span>Register</span>
//                 </Link>
//               </div>
//             )}
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//           Interactive Learning Platform
//         </h1>
//         <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
//           Connect with educators and learners through real-time collaboration, Q&A, and video sessions.
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
//           {!user ? (
//             <>
//               <Link
//                 to="/login"
//                 className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 transition-all"
//               >
//                 <FaSignInAlt />
//                 <span>Get Started</span>
//               </Link>
//               <Link
//                 to="/register"
//                 className="px-8 py-3 border border-gray-600 hover:bg-gray-800 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 transition-all"
//               >
//                 <FaUserPlus />
//                 <span>Create Account</span>
//               </Link>
//             </>
//           ) : (
//             <Link
//               to="/dashboard"
//               className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-lg font-medium flex items-center justify-center space-x-2 transition-all"
//             >
//               <FaUserCircle className="text-xl" />
//               <span>Go to Dashboard</span>
//             </Link>
//           )}
//         </div>

//         {/* Features Grid */}
// <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
//   <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all">
//     <div className="text-blue-400 text-3xl mb-3">📚</div>
//     <h3 className="text-xl font-semibold mb-2">Ask Questions</h3>
//     <p className="text-gray-400">Get help from educators in real-time</p>
//     {user && (
//       <Link
//         to="/questions"
//         className="mt-4 inline-block text-blue-400 hover:text-blue-300 text-sm"
//       >
//         View Questions →
//       </Link>
//     )}
//   </div>

//   <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
//     <div className="text-purple-400 text-3xl mb-3">💬</div>
//     <h3 className="text-xl font-semibold mb-2">Provide Feedback</h3>
//     <p className="text-gray-400">Rate and review teaching sessions</p>
//     {user && (
//       <Link
//         to="/feedback"
//         className="mt-4 inline-block text-purple-400 hover:text-purple-300 text-sm"
//       >
//         Give Feedback →
//       </Link>
//     )}
//   </div>

//   <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all">
//     <div className="text-green-400 text-3xl mb-3">🎥</div>
//     <h3 className="text-xl font-semibold mb-2">Video Calls</h3>
//     <p className="text-gray-400">Interactive learning sessions</p>
//     {user && (
//       <Link
//         to="/video-call"
//         className="mt-4 inline-block text-green-400 hover:text-green-300 text-sm"
//       >
//         Start Call →
//       </Link>
//     )}
//   </div>
// </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800/80 py-6 mt-12">
//         <div className="container mx-auto px-4 text-center text-gray-400">
//           <p>© {new Date().getFullYear()} EduConnect Education Platform. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
