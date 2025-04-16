import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaQuestionCircle, FaComments, FaVideo, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-white">Welcome back, {user?.role}!</h2>
        <p className="text-blue-100 mt-2">
          {user?.role === 'student' ? 'Student' : 'Educator'} Dashboard
        </p>
      </div>

      {user?.role === 'teacher' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Teacher Stats Card */}
          <Link 
            to="/teacher" 
            className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-6 shadow-md border-l-4 border-blue-500"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <FaChartLine className="text-blue-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">Teaching Analytics</h3>
            </div>
            <p className="mt-4 text-gray-300">
              View your teaching statistics, feedback ratings, and past activities.
            </p>
            <div className="mt-6 text-blue-400 flex items-center">
              <span>View Dashboard</span>
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* Questions Card */}
          <Link 
            to="/questions" 
            className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-6 shadow-md border-l-4 border-green-500"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                <FaQuestionCircle className="text-green-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">Student Questions</h3>
            </div>
            <p className="mt-4 text-gray-300">
              Answer pending questions and view your previously answered questions.
            </p>
            <div className="mt-6 text-green-400 flex items-center">
              <span>View Questions</span>
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* Feedback Card */}
          <Link 
            to="/feedback" 
            className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-6 shadow-md border-l-4 border-purple-500"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-full">
                <FaComments className="text-purple-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">Student Feedback</h3>
            </div>
            <p className="mt-4 text-gray-300">
              See what your students are saying about your teaching sessions.
            </p>
            <div className="mt-6 text-purple-400 flex items-center">
              <span>View Feedback</span>
              <span className="ml-2">→</span>
            </div>
          </Link>
        </div>
      )}

      {/* Common Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video Call Card */}
        <Link 
          to="/join" 
          className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-6 shadow-md border-l-4 border-red-500"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/20 rounded-full">
              <FaVideo className="text-red-400 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-white">Video Sessions</h3>
          </div>
          <p className="mt-4 text-gray-300">
            {user?.role === 'teacher' 
              ? 'Start a teaching session with your students' 
              : 'Connect with your teacher for live help'}
          </p>
          <div className="mt-6 text-red-400 flex items-center">
            <span>Start Session</span>
            <span className="ml-2">→</span>
          </div>
        </Link>

        {/* Role-Specific Secondary Card */}
        {user?.role === 'teacher' ? (
          <Link 
            to="/questions" 
            className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-6 shadow-md border-l-4 border-yellow-500"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-500/20 rounded-full">
                <FaChalkboardTeacher className="text-yellow-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">Teaching History</h3>
            </div>
            <p className="mt-4 text-gray-300">
              Review your past teaching sessions and student interactions.
            </p>
            <div className="mt-6 text-yellow-400 flex items-center">
              <span>View History</span>
              <span className="ml-2">→</span>
            </div>
          </Link>
        ) : (
          <Link 
            to="/questions" 
            className="bg-gray-800 hover:bg-gray-700 transition-all rounded-xl p-6 shadow-md border-l-4 border-blue-500"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <FaQuestionCircle className="text-blue-400 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">My Questions</h3>
            </div>
            <p className="mt-4 text-gray-300">
              View all your submitted questions and their status.
            </p>
            <div className="mt-6 text-blue-400 flex items-center">
              <span>View Questions</span>
              <span className="ml-2">→</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



