import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">EduConnect</h1>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
// import { useAuth } from '../../context/AuthContext';

// const Header = () => {
//   const { user, logout } = useAuth();

//   return (
//     <header className="bg-gray-800 shadow-sm">
//       <div className="flex justify-between items-center px-4 py-3">
//         <h1 className="text-xl font-semibold text-white">Education Platform</h1>
//         <div className="flex items-center space-x-4">
//           {user && (
//             <>
//               <span className="text-gray-300">Welcome, {user.name}</span>
//               <span className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm">
//                 {user.role}
//               </span>
//               <button
//                 onClick={logout}
//                 className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;