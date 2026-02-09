import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import QuizzesAttemptedTable from './QuizzesAttemptedTable';
import { Button , message} from "antd";
import api from "../../api/axios";


function StudentDashboard() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
    useEffect(
        () => {
            async function fetchQuizAttempted(){
                try{
                    console.log("calling the function");
                    const response = await api.get(`/user/student/quizzes/history`);
                    console.log(response);
                    setQuizzes(response.data);
                    
                }
                catch{
                    
                    message.error("Failed to load attempted quizzes");
                }
            }
            fetchQuizAttempted();
        },[]
    )

  return (
    <div>
      <Button onClick={()=>navigate("/student/attempt_quiz")}>Attempt Quiz</Button>
      <h2>Attempted Quizzes</h2>
      <QuizzesAttemptedTable quizzes={quizzes}/>
    </div>
  )
}

export default StudentDashboard
