import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';
import StatCard from '../components/UI/StatCard';
import Badge from '../components/UI/Badge';
import EmptyState from '../components/UI/EmptyState';
import questionService from '../services/questions';
import teacherService from '../services/teacher';

const TeacherDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSolved: 0,
    avgRating: 0,
    totalPoints: 0,
    totalReviews: 0,
    todaySessions: 0,
    pendingDoubts: 0
  });
  const [openDoubts, setOpenDoubts] = useState([]);
  const [acceptedDoubts, setAcceptedDoubts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchOpenDoubts();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchTeacherStats(),
        fetchOpenDoubts(),
        fetchAcceptedDoubts()
      ]);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeacherStats = async () => {
    try {
      const statsData = await teacherService.getTeacherStats(token);
      setStats(prevStats => ({
        ...prevStats,
        totalSolved: statsData.totalSolved || 0,
        avgRating: statsData.avgRating || 0,
        totalPoints: statsData.totalPoints || 0,
        totalReviews: statsData.totalReviews || 0,
        todaySessions: statsData.todaySessions || 0
      }));
    } catch (error) {
      console.error('Failed to fetch teacher stats:', error);
    }
  };

  const fetchOpenDoubts = async () => {
    try {
      setRefreshing(true);
      const doubts = await questionService.getOpenQuestions(token);
      setOpenDoubts(doubts);
      setStats(prevStats => ({
        ...prevStats,
        pendingDoubts: doubts.length
      }));
    } catch (error) {
      console.error('Failed to fetch open doubts:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchAcceptedDoubts = async () => {
    try {
      const myQuestions = await questionService.getMyQuestions(token);
      // Filter for accepted but not completed questions
      const accepted = myQuestions.filter(q => q.isAccepted && !q.isCompleted);
      setAcceptedDoubts(accepted);
    } catch (error) {
      console.error('Failed to fetch accepted doubts:', error);
    }
  };

  const handleAcceptDoubt = async (doubtId) => {
    try {
      await questionService.acceptQuestion(doubtId, token);
      // Refresh data after accepting
      await fetchOpenDoubts();
      await fetchAcceptedDoubts();
      // Navigate to video call
      navigate(`/room/${doubtId}`);
    } catch (error) {
      console.error('Failed to accept doubt:', error);
      alert('Failed to accept doubt. Please try again.');
    }
  };

  const handleStartSession = (doubtId) => {
    navigate(`/room/${doubtId}`);
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const questionDate = new Date(date);
    const diffInMs = now - questionDate;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Teaching Analytics</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Monitor your performance and manage student doubts
        </p>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon="🎓"
          label="Total Doubts Solved"
          value={stats.totalSolved}
          trend="+12% this week"
        />
        <StatCard
          icon="⭐"
          label="Average Rating"
          value={stats.avgRating.toFixed(1)}
          subtitle={`Based on ${stats.totalReviews} reviews`}
        />
        <StatCard
          icon="💰"
          label="Total Points"
          value={stats.totalPoints}
          trend="+45 this week"
        />
      </div>

      {/* Live Doubt Queue Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Live Doubt Queue</h2>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            {refreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                <span>Auto-refreshing</span>
              </>
            )}
          </div>
        </div>

        {openDoubts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {openDoubts.map((doubt) => (
              <div
                key={doubt._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-6"
              >
                {/* Student Info Header */}
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3 flex-shrink-0">
                    {doubt.student?.name?.charAt(0).toUpperCase() || 'S'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {doubt.student?.name || 'Student'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatTimestamp(doubt.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Question Preview */}
                <p className="text-sm sm:text-base text-gray-700 mb-3 overflow-hidden" style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {doubt.text}
                </p>

                {/* Image Thumbnail */}
                {doubt.imageUrl && (
                  <div className="mb-3">
                    <img
                      src={doubt.imageUrl}
                      alt="Question"
                      className="w-full h-32 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(doubt.imageUrl, '_blank')}
                    />
                  </div>
                )}

                {/* Subject Tags */}
                {doubt.subject && (
                  <div className="mb-4">
                    <Badge variant="info">{doubt.subject}</Badge>
                  </div>
                )}

                {/* Accept Button */}
                <Button
                  variant="success"
                  fullWidth
                  onClick={() => handleAcceptDoubt(doubt._id)}
                  className="text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Accept & Join
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="✨"
            title="No pending doubts"
            message="No pending doubts at the moment. New doubts will appear here automatically."
          />
        )}
      </div>

      {/* Accepted Sessions Section */}
      {acceptedDoubts.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Accepted Sessions</h2>
          
          <div className="space-y-4">
            {acceptedDoubts.map((doubt) => (
              <div
                key={doubt._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    {/* Student Info */}
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold mr-3 flex-shrink-0">
                        {doubt.student?.name?.charAt(0).toUpperCase() || 'S'}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {doubt.student?.name || 'Student'}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Accepted {formatTimestamp(doubt.acceptedAt || doubt.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Question Preview */}
                    <p className="text-sm sm:text-base text-gray-700 overflow-hidden" style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {doubt.text}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                      variant="primary"
                      onClick={() => handleStartSession(doubt._id)}
                      fullWidth
                      className="sm:w-auto text-sm sm:text-base"
                    >
                      Start Session
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/questions')}
                      fullWidth
                      className="sm:w-auto text-sm sm:text-base"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;