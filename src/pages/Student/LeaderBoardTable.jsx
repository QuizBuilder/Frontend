import React from 'react'
import LeaderBoardRow from './LeaderBoardRow'
import "./Styles/LeaderBoardTable.css";

function LeaderBoardTable({ leaderBoard }) {
  return (
    <div className="lbt-wrapper">
      {leaderBoard.length === 0 ? (
        <div className="lbt-empty">
          <span className="lbt-empty-icon">🏆</span>
          <p className="lbt-empty-title">No entries yet</p>
          <p className="lbt-empty-sub">Leaderboard will appear once students submit</p>
        </div>
      ) : (
        <table className="lbt-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard.map((entry, index) => (
              <LeaderBoardRow key={index} row={entry} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default LeaderBoardTable