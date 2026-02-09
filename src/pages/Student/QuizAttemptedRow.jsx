import React from 'react'
import { useNavigate } from 'react-router-dom'

function QuizAttemptedRow({quiz}) {
    const navigate = useNavigate();
  return (
        
      <tr>
        <td>{quiz.quizCode}</td>
        <td>{quiz.topic}</td>
        <td>{quiz.difficulty}</td>
        <td>{quiz.score}</td>
        <td>
            <button onClick={() => navigate(`/teacher/${quiz.quizCode}/quiz_info`)}>
            Quiz Info
            </button>
            <button onClick={() => navigate(`/teacher/leaderboard/${quiz.quizCode}`)}>
            See Leaderboard
            </button>
        </td>
    </tr>
    
  )
}

export default QuizAttemptedRow
