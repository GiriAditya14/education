import { useEffect, useState } from 'react';
import teacherService from '../../services/teacher';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../UI/StatCard';
import FeedbackCard from './FeedbackCard';

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

  // Calculate rating distribution
  const getRatingDistribution = () => {
    if (!stats || !stats.feedbacks || stats.feedbacks.length === 0) {
      return [0, 0, 0, 0, 0];
    }

    const distribution = [0, 0, 0, 0, 0];
    stats.feedbacks.forEach(feedback => {
      if (feedback.rating >= 1 && feedback.rating <= 5) {
        distribution[feedback.rating - 1]++;
      }
    });
    return distribution;
  };

  const distribution = stats ? getRatingDistribution() : [0, 0, 0, 0, 0];
  const totalReviews = stats?.totalReviews || 0;

  // Skeleton loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          icon="⭐"
          label="Average Rating"
          value={stats.averageRating}
          subtitle={`Based on ${totalReviews} ${totalReviews === 1 ? 'review' : 'reviews'}`}
          size="lg"
        />
        <StatCard
          icon="📊"
          label="Total Reviews"
          value={totalReviews}
          size="lg"
        />
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Rating Distribution</h3>
        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = distribution[stars - 1];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={stars} className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 w-20">
                  <span className="text-sm font-medium text-gray-700">{stars}</span>
                  <span className="text-yellow-400 text-lg">★</span>
                </div>
                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-24 text-right">
                  <span className="text-sm font-medium text-gray-700">
                    {percentage.toFixed(0)}%
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({count})
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback List */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Feedback</h3>
        {stats.feedbacks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              No feedback yet
            </h4>
            <p className="text-gray-600 mb-6">
              Keep teaching great sessions and feedback will appear here!
            </p>
            <p className="text-sm text-gray-500">
              Students can submit feedback after completing sessions with you.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {stats.feedbacks.map((feedback) => (
              <FeedbackCard key={feedback._id} feedback={feedback} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherStats;