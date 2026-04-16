import { Link } from "react-router-dom";

const EdtechCategory = () => {
  const platforms = [
    { id: "pw", name: "Physics Wallah", icon: "📘", description: "Affordable quality education" },
    { id: "apna", name: "Apna College", icon: "👨‍💻", description: "Programming & placement prep" },
    { id: "vedantu", name: "Vedantu", icon: "🎯", description: "Live online learning" },
    { id: "unacademy", name: "Unacademy", icon: "📚", description: "India's largest learning platform" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
            Select Your EdTech Platform
          </h1>
          <p className="text-gray-300 text-lg">Learn from certified instructors on leading platforms</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {platforms.map((platform) => (
            <Link
              to={`/category/edtech/${platform.id}`}
              key={platform.id}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/30 to-teal-500/30 backdrop-blur-sm flex items-center justify-center text-5xl border-2 border-white/20 group-hover:scale-110 transition-transform duration-300">
                  {platform.icon}
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
                {platform.name}
              </h2>
              <p className="text-gray-300 text-sm">{platform.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/category"
            className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors text-lg"
          >
            <span>← Back to Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EdtechCategory;
