import React from 'react'
import "./Styles/LeaderBoardRow.css";

function LeaderBoardRow({ row }) {

  const getMedal = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return 'rank-default';
  };

  const getScoreClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-mid';
    return 'score-low';
  };

  const medal = getMedal(row.rank);

  return (
    <tr className={`lbr-row ${row.rank <= 3 ? 'top-three' : ''}`}>

      {/* Rank */}
      <td>
        <div className={`lbr-rank ${getRankClass(row.rank)}`}>
          {medal
            ? <span className="lbr-medal">{medal}</span>
            : <span className="lbr-rank-num">#{row.rank}</span>
          }
        </div>
      </td>

      {/* Name */}
      <td>
        <div className="lbr-name-cell">
          <div className="lbr-avatar">
            {row.name?.charAt(0).toUpperCase()}
          </div>
          <span className="lbr-name">{row.name}</span>
        </div>
      </td>

      {/* Score */}
      <td>
        <span className={`lbr-score ${getScoreClass(row.score)}`}>
          {row.score}
        </span>
      </td>

    </tr>
  );
}

export default LeaderBoardRow;