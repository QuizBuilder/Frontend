import { useEffect, useState } from "react";
import QuizTable from "./QuizTable";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getGeneratedQuizzes } from "../../api/teacherApi";
import "./Styles/TeacherDashboard.css";

const TeacherDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getGeneratedQuizzes();
        setQuizzes(data);
      } catch (error) {
        message.error(
          error.response?.data?.message || "Failed to load quizzes"
        );
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="td-root">
      <div className="td-grid-overlay" />

      {/* Sidebar */}
      <aside className="td-sidebar">
        <div className="td-brand">EDU<span>PORTAL</span></div>
        <nav className="td-nav">
          <div className="td-nav-item active">
            <span className="td-nav-icon">⬛</span>
            Dashboard
          </div>
          <div className="td-nav-item" onClick={() => navigate("/teacher/generate_quiz")}>
            <span className="td-nav-icon">✨</span>
            Generate Quiz
          </div>
        </nav>
        <div className="td-sidebar-footer">
          <div className="td-avatar">T</div>
          <div className="td-user-info">
            <span className="td-user-name">Teacher</span>
            <span className="td-user-role">Educator</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="td-main">

        {/* Header */}
        <header className="td-header">
          <div>
            <p className="td-header-sub">Welcome back 👋</p>
            <h1 className="td-header-title">Teacher Dashboard</h1>
          </div>
          <Button
            className="td-generate-btn"
            onClick={() => navigate("/teacher/generate_quiz")}
          >
            + Generate Quiz
          </Button>
        </header>

        {/* Stats */}
        <div className="td-stats-row">
          <div className="td-stat-card">
            <span className="td-stat-icon">📋</span>
            <div>
              <div className="td-stat-num">{quizzes.length}</div>
              <div className="td-stat-label">Total Quizzes</div>
            </div>
          </div>
          <div className="td-stat-card">
            <span className="td-stat-icon">🟢</span>
            <div>
              <div className="td-stat-num">
                {quizzes.filter(q => q.active).length}
              </div>
              <div className="td-stat-label">Active</div>
            </div>
          </div>
          <div className="td-stat-card">
            <span className="td-stat-icon">🏁</span>
            <div>
              <div className="td-stat-num">
                {quizzes.filter(q => !q.active).length}
              </div>
              <div className="td-stat-label">Completed</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="td-table-section">
          <div className="td-table-header">
            <h2 className="td-table-title">Generated Quizzes</h2>
            <span className="td-table-count">{quizzes.length} total</span>
          </div>
          <div className="td-table-wrapper">
            <QuizTable quizzes={quizzes} />
          </div>
        </div>

      </main>
    </div>
  );
};

export default TeacherDashboard;