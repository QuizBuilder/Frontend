import { useEffect, useState } from "react";
import api from "../../api/axios";
import QuizTable from "./QuizTable";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("user/teacher/quizzes")
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
        <Button onClick={()=>navigate("/teacher/generate_quiz")}>Generate Quiz</Button>
      <h2>Generated Quizzes</h2>
      <QuizTable quizzes={quizzes} />
    </div>
  );
};

export default TeacherDashboard;

