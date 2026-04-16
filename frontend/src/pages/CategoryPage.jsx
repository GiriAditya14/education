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
    <div>
      <div className="mb-8 bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Choose Your Learning Path
        </h1>
        <p className="text-gray-600">Select a category to find the perfect mentor for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category) => (
          <Link
            to={`/category/${category.id}`}
            key={category.id}
            className="group relative bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="text-5xl sm:text-6xl bg-gradient-to-br from-blue-50 to-purple-50 rounded-full w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border border-gray-100 group-hover:scale-110 group-hover:border-blue-200 transition-all duration-300">
                {category.icon}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {category.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Renders child route like /category/college */}
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default CategoryPage;
