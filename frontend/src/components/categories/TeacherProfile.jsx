import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TeacherProfile = () => {
  const { id } = useParams();
  // In a real app, you would fetch teacher data based on ID
  const teacher = {
    name: "Striver",
    specialization: "DSA & Competitive Programming",
    experience: "5+ years",
    rating: "4.9",
    students: "50,000+",
    bio: "Expert in data structures and algorithms with proven track record of students getting into FAANG companies.",
    image: "https://example.com/striver.jpg"
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6">
            <img 
              src={teacher.image} 
              alt={teacher.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{teacher.name}</h1>
            <div className="flex items-center mb-4">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                ⭐ {teacher.rating} ({teacher.students} students)
              </span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Specialization</h2>
              <p className="text-gray-700">{teacher.specialization}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Experience</h2>
              <p className="text-gray-700">{teacher.experience}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-700">{teacher.bio}</p>
            </div>
            
            <Link 
              to="/questions" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ask Doubt
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;