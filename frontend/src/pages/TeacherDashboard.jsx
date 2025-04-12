import QuestionList from '../components/Questions/QuestionList';

const TeacherDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Teacher Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-white">Open Questions</h3>
        <QuestionList isTeacherView={true} />
      </div>
    </div>
  );
};

export default TeacherDashboard;