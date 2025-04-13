import { Link } from 'react-router-dom';

const YoutubeCategory = () => {
  const teachers = [
    {
      id: 'striver',
      name: 'Striver',
      specialization: 'DSA & Competitive Programming',
      students: '50,000+',
      icon: '👨‍💻'
    },
    {
      id: 'apna-college',
      name: 'Apna College',
      specialization: 'Java, DSA & Interview Prep',
      students: '1,00,000+',
      icon: '🎯'
    },
    {
      id: 'love-babbar',
      name: 'Love Babbar',
      specialization: 'SDE Sheet, DSA & Placements',
      students: '80,000+',
      icon: '📘'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-500">
          Popular YouTube Educators
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all shadow-md hover:shadow-xl"
            >
              <div className="text-5xl mb-4 text-center">{teacher.icon}</div>
              <h2 className="text-xl font-semibold mb-1 text-center">{teacher.name}</h2>
              <p className="text-gray-300 text-center mb-2">{teacher.specialization}</p>
              <p className="text-sm text-gray-400 text-center mb-4">
                Students: {teacher.students}
              </p>

              <div className="flex justify-center space-x-3 mt-4">
                <Link
                  to={`/category/teacher/${teacher.id}`}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm"
                >
                  View Profile
                </Link>
                <Link
                  to="/questions"
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-md text-sm"
                >
                  Ask Doubt
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <span className="text-sm">← Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default YoutubeCategory;
