import QuizRow from "./QuizRow";

const QuizTable = ({ quizzes }) => {
  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Quiz Code</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Topic</th>
          <th>Difficulty</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {quizzes.map((quiz) => (
          <QuizRow key={quiz.quizCode} quiz={quiz} />
        ))}
      </tbody>
    </table>
  );
};

export default QuizTable;

