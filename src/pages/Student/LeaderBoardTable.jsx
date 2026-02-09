import React from 'react'
import LeaderBoardRow from './LeaderBoardRow'

function LeaderBoardTable({leaderBoard}) {

  return (
    <div>
      <table border="1" cellPadding="10">
        <thead>
            <tr>
                <th>Name</th>
                <th>score</th>
                <th>Rank</th>
            </tr>
        </thead>
        <tbody>
        {
            leaderBoard.map((entry, index)=>(
                <LeaderBoardRow key={index} row={entry} />
            ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default LeaderBoardTable
