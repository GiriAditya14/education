import { Link, Outlet } from "react-router-dom";

const CategoryPage = () => {
  const categories = [
    {
      id: "college",
      title: "College Mentors",
      description: "Connect with professors and TAs from top institutions",
      icon: "🏛️",
    },
    {
      id: "edtech",
      title: "EdTech Platforms",
      description: "Learn from certified instructors on popular platforms",
      icon: "💻",
    },
    {
      id: "youtube",
      title: "YouTube Educators",
      description: "Get mentored by famous online educators",
      icon: "🎥",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Choose Your Learning Path
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="bg-gray-800 bg-opacity-60 rounded-2xl p-6 hover:bg-opacity-80 transition duration-300 shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="text-5xl bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  {category.title}
                </h2>
                <p className="text-gray-300">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Renders child route like /category/college */}
        <div className="mt-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
