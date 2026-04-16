import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4 py-8">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <div className="mb-4 p-2 bg-red-600 text-white rounded-md text-sm">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm" htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-2 px-4 rounded-md transition duration-200 text-base"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-400 hover:text-blue-300"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
