import { useEffect, useState } from 'react';
import teacherService from '../../services/teacher';
import { useAuth } from '../../context/AuthContext';

const TeacherStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await teacherService.getTeacherStats(token);
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return <div className="text-center py-8 text-gray-400">Loading stats...</div>;
  }

  if (error) {
    return <div className="bg-red-600 text-white p-4 rounded-md">{error}</div>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-6 text-white">Your Teaching Stats</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 text-sm mb-1">Total Reviews</h4>
          <p className="text-3xl font-bold text-white">{stats.totalReviews}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 text-sm mb-1">Average Rating</h4>
          <p className="text-3xl font-bold text-white">
            {stats.averageRating}
            <span className="text-yellow-400 ml-1">★</span>
          </p>
        </div>
      </div>
      <h4 className="text-lg font-semibold mb-4 text-white">Recent Feedback</h4>
      {stats.feedbacks.length === 0 ? (
        <p className="text-gray-400">No feedback received yet</p>
      ) : (
        <div className="space-y-4">
          {stats.feedbacks.map((feedback) => (
            <div key={feedback._id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-300">{feedback.feedbackText || 'No comment'}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    From student: {feedback.student?.name || 'Anonymous'}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">{feedback.rating}</span>
                  <span className="text-yellow-400">★</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherStats;