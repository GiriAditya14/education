import { useParams, Link } from 'react-router-dom';

const teachersData = [
  {
    id: "striver",
    name: "Striver",
    specialization: "DSA & Competitive Programming",
    experience: "5+ years",
    rating: "4.9",
    students: "50,000+",
    bio: "Expert in data structures and algorithms with a proven track record of students getting into FAANG companies.",
    image: "https://imgs.search.brave.com/2J6TvIYx94IeZyTrRnVv8mjMfdmvvz9bjhGGpx46vCY/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9pLnl0/aW1nLmNvbS92aS90/Tm1fTk5TQjNfdy9t/YXhyZXNkZWZhdWx0/LmpwZw"
  },
  {
    id: "apna-college",
    name: "Apna College",
    specialization: "Java, DSA & Interview Prep",
    experience: "4+ years",
    rating: "4.8",
    students: "1,00,000+",
    bio: "Helping students build solid foundations in Java and DSA with real-world projects and guidance.",
    image: "https://imgs.search.brave.com/3e_klz-9151NKJILjIXQcuhniQ8EuF9_jw0fmtkZqtM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oYXJ5/YW5hdGV0LmluL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzA3/L1NocmFkaGEtS2hh/cHJhLmpwZw"
  },
  {
    id: "love-babbar",
    name: "Love Babbar",
    specialization: "SDE Sheet, DSA & Placements",
    experience: "6+ years",
    rating: "4.7",
    students: "80,000+",
    bio: "Known for the 450 DSA Sheet and exceptional placement prep strategies.",
    image: "https://imgs.search.brave.com/HI0HIq4doHvFw7YGgH6WH5mzTh-zBweGfAmtQs5HD70/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zMy1h/cC1ub3J0aGVhc3Qt/MS5hbWF6b25hd3Mu/Y29tL3RlYW1ibGlu/ZHN0YXRpY3MvbGlu/ay8yL2JhZDMyMzc4/MzNiNjE3ZjRkYTNi/Mjc5OWJiMDA4MDc3/XzE2MzIwMjAyMDkz/MjJfcmVzLmpwZWc"
  }
];

const TeacherProfile = () => {
  const { id } = useParams();

  const teacher = teachersData.find((t) => t.id === id);

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Teacher not found</h1>
        <Link to="/category/youtube" className="text-blue-400 hover:text-blue-300">
          ← Back to YouTube Category
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-800/70 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition-shadow overflow-hidden md:flex">
          <div className="md:w-1/3 p-6 flex items-center justify-center">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="w-full h-auto max-w-xs rounded-lg"
            />
          </div>

          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2 text-blue-400">{teacher.name}</h1>

            <div className="flex items-center mb-4">
              <span className="bg-yellow-500/10 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ {teacher.rating} ({teacher.students} students)
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-purple-400 mb-1">Specialization</h2>
              <p className="text-gray-300">{teacher.specialization}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-purple-400 mb-1">Experience</h2>
              <p className="text-gray-300">{teacher.experience}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-purple-400 mb-1">About</h2>
              <p className="text-gray-300">{teacher.bio}</p>
            </div>

            <Link
              to="/questions"
              className="inline-block mt-4 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg font-semibold transition-colors"
            >
              Ask Doubt
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/category/youtube"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
          >
            ← Back to YouTube Category
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
