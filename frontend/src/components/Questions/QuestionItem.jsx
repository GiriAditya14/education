import { FaCheck, FaUser } from 'react-icons/fa';

const QuestionItem = ({ question, isTeacherView, onAccept, currentUserId }) => {
  const isAccepted = question.isAccepted;
  const isMyQuestion = question.student?._id === currentUserId;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 bg-gray-700 p-3 rounded-full">
          <FaUser className="text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-white">
                {question.student?.name || 'Unknown User'}
              </h4>
              <p className="text-sm text-gray-400">
                {new Date(question.createdAt).toLocaleString()}
              </p>
            </div>
            {isAccepted && (
              <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                Accepted
              </span>
            )}
          </div>
          <p className="mt-2 text-gray-300">{question.text}</p>
          {question.imageUrl && (
            <div className="mt-3">
              <img
                src={question.imageUrl}
                alt="Question illustration"
                className="max-w-full h-auto rounded-md"
              />
            </div>
          )}
          {isTeacherView && !isAccepted && (
            <button
              onClick={() => onAccept(question._id)}
              className="mt-3 flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm"
            >
              <FaCheck />
              <span>Accept Question</span>
            </button>
          )}
          {!isTeacherView && isMyQuestion && isAccepted && (
            <div className="mt-3 text-sm text-gray-400">
              Accepted by: {question.acceptedBy?.name || 'Teacher'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;