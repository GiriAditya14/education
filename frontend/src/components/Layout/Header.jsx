import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 shadow-sm">
      <div className="flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-semibold text-white">Education Platform</h1>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="text-gray-300">Welcome, {user.name}</span>
              <span className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm">
                {user.role}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;