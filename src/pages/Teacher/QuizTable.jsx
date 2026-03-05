import QuizRow from "./QuizRow";
import "./Styles/QuizTable.css";

const QuizTable = ({ quizzes }) => {
  return (
    <div className="qt-wrapper">
      {quizzes.length === 0 ? (
        <div className="qt-empty">
          <span className="qt-empty-icon">📋</span>
          <p className="qt-empty-title">No quizzes generated yet</p>
          <p className="qt-empty-sub">Your generated quizzes will appear here</p>
        </div>
      ) : (
        <table className="qt-table">
          <thead>
            <tr>
              <th>Quiz Code</th>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <QuizRow key={quiz.quizCode} quiz={quiz} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuizTable;