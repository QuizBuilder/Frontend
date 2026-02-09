import { useNavigate } from "react-router-dom";

const QuizRow = ({ quiz }) => {
  const navigate = useNavigate();

  return (
    <tr>
      <td>{quiz.quizCode}</td>
      <td>{quiz.startTime}</td>
      <td>{quiz.endTime}</td>
      <td>{quiz.topic}</td>
      <td>{quiz.difficulty}</td>
      <td>
        <button onClick={() => navigate(`/teacher/${quiz.quizCode}/quiz_info`)}>
          Quiz Info
        </button>
        <button onClick={() => navigate(`/teacher/leaderboard/${quiz.quizCode}`)}>
          See Leaderboard
        </button>
      </td>
    </tr>
  );
};

export default QuizRow;

