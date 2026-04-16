import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import QuestionForm from '../components/Questions/QuestionForm';
import QuestionList from '../components/Questions/QuestionList';
import { FiSearch, FiFilter } from 'react-icons/fi';

const QuestionsPage = () => {
  const { user } = useAuth();
  const [questionsUpdated, setQuestionsUpdated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const handleQuestionAdded = () => {
    setQuestionsUpdated(!questionsUpdated);
  };

  const isTeacher = user?.role === 'teacher';

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isTeacher ? 'Student Questions' : 'My Questions'}
        </h2>
        <p className="text-gray-600">
          {isTeacher 
            ? 'Review and accept questions from students' 
            : 'Ask questions and track your doubts'
          }
        </p>
      </div>

      {/* Teacher-specific search and filters */}
      {isTeacher && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Subject filter */}
            <div className="relative md:w-64">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white cursor-pointer"
              >
                <option value="all">All Subjects</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="computer-science">Computer Science</option>
                <option value="english">English</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active filters display */}
          {(searchQuery || subjectFilter !== 'all') && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="text-gray-600">Active filters:</span>
              {searchQuery && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  Search: "{searchQuery}"
                </span>
              )}
              {subjectFilter !== 'all' && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  Subject: {subjectFilter}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSubjectFilter('all');
                }}
                className="text-blue-700 hover:text-blue-800 font-medium ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {/* Question form for students */}
      {!isTeacher && (
        <QuestionForm onQuestionAdded={handleQuestionAdded} />
      )}

      {/* Question list */}
      <QuestionList 
        isTeacherView={isTeacher} 
        key={questionsUpdated}
        searchQuery={searchQuery}
        subjectFilter={subjectFilter}
      />
    </div>
  );
};

export default QuestionsPage;