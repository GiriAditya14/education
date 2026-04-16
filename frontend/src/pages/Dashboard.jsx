import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaQuestionCircle, FaComments, FaVideo, FaChartLine } from 'react-icons/fa';
import StudentDashboard from '../components/Dashboard/StudentDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Render Student Dashboard for students
  if (user?.role === 'student') {
    return <StudentDashboard />;
  }

  // Render Teacher Dashboard (existing implementation)
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Quick access to your teaching tools</p>
      </div>

      {user?.role === 'teacher' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Teacher Stats Card */}
          <Link 
            to="/teacher" 
            className="bg-white hover:bg-gray-50 transition-all rounded-xl p-6 shadow-md border-l-4 border-blue-500 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <FaChartLine className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Teaching Analytics</h3>
            </div>
            <p className="mt-4 text-gray-600">
              View your teaching statistics, feedback ratings, and past activities.
            </p>
            <div className="mt-6 text-blue-600 flex items-center font-medium">
              <span>View Dashboard</span>
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* Questions Card */}
          <Link 
            to="/questions" 
            className="bg-white hover:bg-gray-50 transition-all rounded-xl p-6 shadow-md border-l-4 border-emerald-500 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                <FaQuestionCircle className="text-emerald-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Student Questions</h3>
            </div>
            <p className="mt-4 text-gray-600">
              Answer pending questions and view your previously answered questions.
            </p>
            <div className="mt-6 text-emerald-600 flex items-center font-medium">
              <span>View Questions</span>
              <span className="ml-2">→</span>
            </div>
          </Link>

          {/* Feedback Card */}
          <Link 
            to="/feedback" 
            className="bg-white hover:bg-gray-50 transition-all rounded-xl p-6 shadow-md border-l-4 border-purple-500 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                <FaComments className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Student Feedback</h3>
            </div>
            <p className="mt-4 text-gray-600">
              See what your students are saying about your teaching sessions.
            </p>
            <div className="mt-6 text-purple-600 flex items-center font-medium">
              <span>View Feedback</span>
              <span className="ml-2">→</span>
            </div>
          </Link>
        </div>
      )}

      {/* Common Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Video Call Card */}
        <Link 
          to="/join" 
          className="bg-white hover:bg-gray-50 transition-all rounded-xl p-6 shadow-md border-l-4 border-red-500 group"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
              <FaVideo className="text-red-600 text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Video Sessions</h3>
          </div>
          <p className="mt-4 text-gray-600">
            {user?.role === 'teacher' 
              ? 'Start a teaching session with your students' 
              : 'Connect with your teacher for live help'}
          </p>
          <div className="mt-6 text-red-600 flex items-center font-medium">
            <span>Start Session</span>
            <span className="ml-2">→</span>
          </div>
        </Link>

        {/* Role-Specific Secondary Card */}
        {user?.role === 'teacher' ? (
          <Link 
            to="/questions" 
            className="bg-white hover:bg-gray-50 transition-all rounded-xl p-6 shadow-md border-l-4 border-amber-500 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors">
                <FaChalkboardTeacher className="text-amber-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Teaching History</h3>
            </div>
            <p className="mt-4 text-gray-600">
              Review your past teaching sessions and student interactions.
            </p>
            <div className="mt-6 text-amber-600 flex items-center font-medium">
              <span>View History</span>
              <span className="ml-2">→</span>
            </div>
          </Link>
        ) : (
          <Link 
            to="/questions" 
            className="bg-white hover:bg-gray-50 transition-all rounded-xl p-6 shadow-md border-l-4 border-blue-500 group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                <FaQuestionCircle className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">My Questions</h3>
            </div>
            <p className="mt-4 text-gray-600">
              View all your submitted questions and their status.
            </p>
            <div className="mt-6 text-blue-600 flex items-center font-medium">
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



