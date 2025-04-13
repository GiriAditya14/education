import { Link } from 'react-router-dom';

const YoutubeCategory = () => {
  const teachers = [
    {
      id: 'striver',
      name: 'Striver',
      specialization: 'DSA & CP',
      students: '500K+',
      icon: '👨‍💻'
    },
    {
      id: 'hitesh',
      name: 'Hitesh Choudhary',
      specialization: 'Web Development',
      students: '1M+',
      icon: '🚀'
    },
    // Add more teachers
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Popular YouTube Educators</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="text-5xl mb-4 text-center">{teacher.icon}</div>
              <h2 className="text-xl font-bold mb-1 text-center">{teacher.name}</h2>
              <p className="text-gray-600 text-center mb-3">{teacher.specialization}</p>
              <p className="text-sm text-gray-500 text-center">Students: {teacher.students}</p>
              
              <div className="mt-6 flex justify-center space-x-3">
                <Link 
                  to={`/category/teacher/${teacher.id}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  View Profile
                </Link>
                <Link 
                  to="/questions" 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Ask Doubt
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeCategory;