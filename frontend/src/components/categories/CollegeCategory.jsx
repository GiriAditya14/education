import { Link } from "react-router-dom";

const CollegeCategory = () => {
  const colleges = [
    { id: "iit", name: "IITs", icon: "🇮🇳" },
    { id: "nit", name: "NITs", icon: "🏛️" },
    { id: "iiit", name: "IIITs", icon: "💻" },
    { id: "others", name: "Other Colleges", icon: "🎓" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Select Your College Category
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {colleges.map((college) => (
            <Link
              to={`/category/college/${college.id}`}
              key={college.id}
              className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all text-center shadow-md hover:shadow-xl"
            >
              <div className="text-5xl mb-4">{college.icon}</div>
              <h2 className="text-xl font-semibold text-white">{college.name}</h2>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span className="text-sm">← Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeCategory;
