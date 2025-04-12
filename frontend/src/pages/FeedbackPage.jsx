import { useAuth } from '../context/AuthContext';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import TeacherStats from '../components/Feedback/TeacherStats';

const FeedbackPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">
        {user?.role === 'student' ? 'Submit Feedback' : 'Feedback'}
      </h2>
      {user?.role === 'student' ? <FeedbackForm /> : <TeacherStats />}
    </div>
  );
};

export default FeedbackPage;