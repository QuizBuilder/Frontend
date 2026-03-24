import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import StudentDashboard from './pages/Student/StudentDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import CreateQuiz from './pages/Teacher/CreateQuiz';
import QuizInfo from './pages/Teacher/QuizInfo';
import AttemptQuiz from './pages/Student/AttemptQuiz';
import LeaderBoard from './pages/LeaderBoard';
import QuizQuestions from './pages/Student/QuizQuestions';
import AttemptedQuizInfo from './pages/Student/AttemptedQuizInfo';
import StudentProfile from './pages/Student/StudentProfile';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/generate_quiz" element={<CreateQuiz/>}/>
        <Route path="/teacher/:quiz_code/quiz_info" element={<QuizInfo/>}/>
        <Route path="/student/attempt_quiz" element={<AttemptQuiz/>}/>
        <Route path="/teacher/leaderboard/:quiz_code" element={<LeaderBoard/>}/>
        <Route path="/student/:quiz_code/attempt_quiz" element={<QuizQuestions/>}/>
        <Route path="/student/:quiz_code/quiz_info" element={<AttemptedQuizInfo/>}/>
        <Route path="/student/profile" element={<StudentProfile />} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App
