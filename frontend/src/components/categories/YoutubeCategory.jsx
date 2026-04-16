import { Link } from 'react-router-dom';
import Button from '../UI/Button';

const YoutubeCategory = () => {
  const teachers = [
    {
      id: 'striver',
      name: 'Striver',
      specialization: 'DSA & Competitive Programming',
      students: '50,000+',
      rating: 4.8,
      icon: '👨‍💻'
    },
    {
      id: 'apna-college',
      name: 'Apna College',
      specialization: 'Java, DSA & Interview Prep',
      students: '1,00,000+',
      rating: 4.9,
      icon: '🎯'
    },
    {
      id: 'love-babbar',
      name: 'Love Babbar',
      specialization: 'SDE Sheet, DSA & Placements',
      students: '80,000+',
      rating: 4.7,
      icon: '📘'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-500">
            Popular YouTube Educators
          </h1>
          <p className="text-gray-300 text-lg">Learn from the best content creators in tech education</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              {/* Teacher Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500/30 to-yellow-500/30 backdrop-blur-sm flex items-center justify-center text-5xl border-2 border-white/20 group-hover:scale-110 transition-transform duration-300">
                  {teacher.icon}
                </div>
              </div>

              {/* Teacher Info */}
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-yellow-500">
                  {teacher.name}
                </h2>
                <p className="text-gray-300 mb-3">{teacher.specialization}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(teacher.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-500'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-semibold">{teacher.rating}</span>
                </div>
                
                <p className="text-sm text-gray-400">
                  {teacher.students} Students
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-6">
                <Link to={`/category/teacher/${teacher.id}`} className="w-full">
                  <Button variant="secondary" fullWidth>
                    View Profile
                  </Button>
                </Link>
                <Link to="/questions" className="w-full">
                  <Button variant="success" fullWidth>
                    Ask Doubt
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/category"
            className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors text-lg"
          >
            <span>← Back to Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default YoutubeCategory;
