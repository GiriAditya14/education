import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Dashboard</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-white">Welcome, {user?.name}</h3>
        <p className="text-gray-300">
          You are logged in as a <span className="font-semibold">{user?.role}</span>.
        </p>
        {user?.role === 'student' && (
          <p className="mt-4 text-gray-300">
            You can ask questions, submit feedback, and join video calls with teachers.
          </p>
        )}
        {user?.role === 'teacher' && (
          <p className="mt-4 text-gray-300">
            You can answer student questions, view your teaching stats, and join video calls.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;