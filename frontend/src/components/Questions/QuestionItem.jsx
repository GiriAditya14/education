import QuestionCard from './QuestionCard';

const QuestionItem = ({ question, isTeacherView, onAccept, currentUserId }) => {
  return (
    <QuestionCard
      question={question}
      isTeacherView={isTeacherView}
      onAccept={onAccept}
      currentUserId={currentUserId}
    />
  );
};

export default QuestionItem;