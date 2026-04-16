import { Link } from "react-router-dom";

const CollegeCategory = () => {
  const colleges = [
    { id: "iit", name: "IITs", icon: "🇮🇳", description: "Indian Institutes of Technology" },
    { id: "nit", name: "NITs", icon: "🏛️", description: "National Institutes of Technology" },
    { id: "iiit", name: "IIITs", icon: "💻", description: "Indian Institutes of Information Technology" },
    { id: "others", name: "Other Colleges", icon: "🎓", description: "Top universities and colleges" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Select Your College Category
          </h1>
          <p className="text-gray-300 text-lg">Connect with mentors from premier institutions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {colleges.map((college) => (
            <Link
              to={`/category/college/${college.id}`}
              key={college.id}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm flex items-center justify-center text-5xl border-2 border-white/20 group-hover:scale-110 transition-transform duration-300">
                  {college.icon}
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                {college.name}
              </h2>
              <p className="text-gray-300 text-sm">{college.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/category"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-lg"
          >
            <span>← Back to Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollegeCategory;
