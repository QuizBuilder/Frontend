import { useNavigate } from "react-router-dom";
import "./Styles/QuizRow.css";

const QuizRow = ({ quiz }) => {
  const navigate = useNavigate();

  const getDifficultyClass = (difficulty) => {
    switch (difficulty?.toUpperCase()) {
      case 'EASY':   return 'badge-easy';
      case 'MEDIUM': return 'badge-medium';
      case 'HARD':   return 'badge-hard';
      default:       return 'badge-default';
    }
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "—";

    const [date, time] = dateStr.split(" ");
    const [day, month, year] = date.split("-");
    const [hour, minute] = time.split(":");

    const d = new Date(year, month - 1, day, hour, minute);

    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <tr className="qr-row">

      {/* Quiz Code */}
      <td>
        <span className="qr-code">{quiz.quizCode}</span>
      </td>

      {/* Topic */}
      <td>
        <span className="qr-topic">{quiz.topic}</span>
      </td>

      {/* Difficulty */}
      <td>
        <span className={`qr-badge ${getDifficultyClass(quiz.difficulty)}`}>
          {quiz.difficulty}
        </span>
      </td>

      {/* Start Time */}
      <td>
        <span className="qr-time">{formatDateTime(quiz.startTime)}</span>
      </td>

      {/* End Time */}
      <td>
        <span className="qr-time">{formatDateTime(quiz.endTime)}</span>
      </td>

      {/* Actions */}
      <td>
        <div className="qr-actions">
          <button
            className="qr-btn qr-btn-info"
            onClick={() => navigate(`/teacher/${quiz.quizCode}/quiz_info`)}
          >
            Quiz Info
          </button>
          <button
            className="qr-btn qr-btn-leaderboard"
            onClick={() => navigate(`/teacher/leaderboard/${quiz.quizCode}`)}
          >
            🏆 Leaderboard
          </button>
        </div>
      </td>

    </tr>
  );
};

export default QuizRow;