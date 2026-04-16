import { useAuth } from '../context/AuthContext';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import TeacherStats from '../components/Feedback/TeacherStats';

const FeedbackPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Student Feedback</h2>
        <p className="text-sm sm:text-base text-gray-600">View your teaching performance and student reviews</p>
      </div>

      {user?.role === 'student' ? (
        <div>
          <FeedbackForm />
        </div>
      ) : (
        <TeacherStats />
      )}
    </div>
  );
};

export default FeedbackPage;