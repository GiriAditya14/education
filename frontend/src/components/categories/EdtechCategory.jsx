import { Link } from "react-router-dom";

const EdtechCategory = () => {
  const platforms = [
    { id: "pw", name: "Physics Wallah", icon: "📘" },
    { id: "apna", name: "Apna College", icon: "👨‍💻" },
    { id: "vedantu", name: "Vedantu", icon: "🎯" },
    { id: "unacademy", name: "Unacademy", icon: "📚" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
          Select Your Edtech Platform
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {platforms.map((platform) => (
            <Link
              to={`/category/edtech/${platform.id}`}
              key={platform.id}
              className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all text-center shadow-md hover:shadow-xl"
            >
              <div className="text-5xl mb-4">{platform.icon}</div>
              <h2 className="text-xl font-semibold text-white">{platform.name}</h2>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <span className="text-sm">← Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EdtechCategory;
