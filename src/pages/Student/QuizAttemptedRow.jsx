import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Styles/QuizAttemptedRow.css";

function QuizAttemptedRow({ quiz }) {
    const navigate = useNavigate();

    const getDifficultyClass = (difficulty) => {
        switch (difficulty?.toUpperCase()) {
            case 'EASY': return 'badge-easy';
            case 'MEDIUM': return 'badge-medium';
            case 'HARD': return 'badge-hard';
            default: return 'badge-default';
        }
    };

    const getScoreClass = (score) => {
        if (score >= 80) return 'score-high';
        if (score >= 50) return 'score-mid';
        return 'score-low';
    };

    return (
        <tr className="qar-row">
            <td>
                <span className="qar-code">{quiz.quizCode}</span>
            </td>
            <td>
                <span className="qar-topic">{quiz.topic}</span>
            </td>
            <td>
                <span className={`qar-badge ${getDifficultyClass(quiz.difficulty)}`}>
                    {quiz.difficulty}
                </span>
            </td>
            <td>
                <span className={`qar-score ${getScoreClass(quiz.score)}`}>
                    {quiz.score} / {quiz.noOfQuestions}
                </span>
            </td>
            <td>
                <div className="qar-actions">
                    <button
                        className="qar-btn qar-btn-info"
                        onClick={() => navigate(`/student/${quiz.quizCode}/quiz_info`)}
                    >
                        Quiz Info
                    </button>
                    <button
                        className="qar-btn qar-btn-leaderboard"
                        onClick={() => navigate(`/teacher/leaderboard/${quiz.quizCode}`)}
                    >
                        🏆 Leaderboard
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default QuizAttemptedRow;