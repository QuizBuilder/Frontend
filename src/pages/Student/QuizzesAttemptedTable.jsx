import React from 'react'
import QuizAttemptedRow from './QuizAttemptedRow'
import "./Styles/QuizzesAttemptedTable.css";

function QuizzesAttemptedTable({quizzes}) {
  return (
    <div className="qat-wrapper">
      {quizzes.length === 0 ? (
        <div className="qat-empty">
          <span className="qat-empty-icon">📭</span>
          <p className="qat-empty-title">No quizzes attempted yet</p>
          <p className="qat-empty-sub">Your attempted quizzes will appear here</p>
        </div>
      ) : (
        <table className="qat-table">
          <thead>
            <tr>
              <th>Quiz Code</th>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <QuizAttemptedRow key={quiz.quizCode} quiz={quiz} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default QuizzesAttemptedTable