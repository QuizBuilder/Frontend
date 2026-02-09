import React from 'react'

function LeaderBoardRow({row}) {
  return (
    
      <tr>
        <td>{row.name}</td>
        <td>{row.score}</td>
        <td>{row.rank}</td>
      </tr>
    
  )
}

export default LeaderBoardRow
