import { message } from 'antd';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LeaderBoardTable from './Student/LeaderBoardTable';
import api from '../api/axios';

function LeaderBoard() {
    const [leaderBoard, setleaderBoard] = useState([]);
    const code = useParams().quiz_code;

    useEffect(
        ()=>{
            async function getLeaderBoard(){
                try{
                    const response = await api.get(`/user/quiz/${code}/leaderboard`);
                    setleaderBoard(response.data);
                }
                catch{
                    message.error("Unable to fetch leader board");
                }
            }
            getLeaderBoard();
        }
        ,[]
    )
    

  return (
    <div>
      <LeaderBoardTable leaderBoard={leaderBoard}/>
    </div>
  )
}

export default LeaderBoard
