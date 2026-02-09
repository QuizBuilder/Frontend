import React from 'react'
import QuizAttemptedRow from './QuizAttemptedRow'

function QuizzesAttemptedTable({quizzes}) {
  return (
    <div>
      <table border="1" cellPadding="10">
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
    </div>
  )
}

export default QuizzesAttemptedTable
