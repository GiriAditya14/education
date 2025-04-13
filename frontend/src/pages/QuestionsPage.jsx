import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import QuestionForm from '../components/Questions/QuestionForm';
import QuestionList from '../components/Questions/QuestionList';

const QuestionsPage = () => {
  const { user } = useAuth();
  const [questionsUpdated, setQuestionsUpdated] = useState(false);

  const handleQuestionAdded = () => {
    setQuestionsUpdated(!questionsUpdated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Questions</h2>
      {user?.role === 'student' && (
        <QuestionForm onQuestionAdded={handleQuestionAdded} />
      )}
      <QuestionList isTeacherView={user?.role === 'teacher'} key={questionsUpdated} />
    </div>
  );
};

export default QuestionsPage;