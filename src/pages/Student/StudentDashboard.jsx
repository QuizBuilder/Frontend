import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import QuizzesAttemptedTable from './QuizzesAttemptedTable';
import { Button, message } from "antd";
import { getAttemptedQuizzes } from "../../api/studentApi";
import "./Styles/StudentDashboard.css";

function StudentDashboard() {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizAttempted = async () => {
            try {
                const data = await getAttemptedQuizzes();
                setQuizzes(data);
            } catch (error) {
                message.error(
                    error.response?.data?.message ||
                    "Failed to load attempted quizzes"
                );
            }
        };
        fetchQuizAttempted();
    }, []);

    return (
        <div className="sd-root">
            <div className="sd-grid-overlay" />

            {/* Sidebar */}
            <aside className="sd-sidebar">
                <div className="sd-brand">EDU<span>PORTAL</span></div>
                <nav className="sd-nav">
                    <div className="sd-nav-item active">
                        <span className="sd-nav-icon">⬛</span>
                        Dashboard
                    </div>
                    <div className="sd-nav-item" onClick={() => navigate("/student/attempt_quiz")}>
                        <span className="sd-nav-icon">✏️</span>
                        Attempt Quiz
                    </div>
                    <div className="sd-nav-item" onClick={() => navigate("/student/profile")}>
                        <span className="sd-nav-icon">👤</span>
                        My Profile
                    </div>
                </nav>
                <div
                    className="sd-sidebar-footer"
                    onClick={() => navigate("/student/profile")}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="sd-avatar">S</div>
                    <div className="sd-user-info">
                        <span className="sd-user-name">Student</span>
                        <span className="sd-user-role">Learner</span>
                    </div>
                    <span className="sd-footer-arrow">→</span>
                </div>
            </aside>

            {/* Main Content */}
            <main className="sd-main">

                {/* Header */}
                <header className="sd-header">
                    <div>
                        <p className="sd-header-sub">Good to see you 👋</p>
                        <h1 className="sd-header-title">Student Dashboard</h1>
                    </div>
                    <div className="sd-header-actions">
                        <Button
                            className="sd-profile-btn"
                            onClick={() => navigate("/student/profile")}
                        >
                            👤 My Profile
                        </Button>
                        <Button
                            className="sd-attempt-btn"
                            onClick={() => navigate("/student/attempt_quiz")}
                        >
                            + Attempt Quiz
                        </Button>
                    </div>
                </header>

                {/* Stats Row */}
                <div className="sd-stats-row">
                    <div className="sd-stat-card">
                        <span className="sd-stat-icon">📝</span>
                        <div>
                            <div className="sd-stat-num">{quizzes.length}</div>
                            <div className="sd-stat-label">Quizzes Attempted</div>
                        </div>
                    </div>
                    <div className="sd-stat-card">
                        <span className="sd-stat-icon">✅</span>
                        <div>
                            <div className="sd-stat-num">
                                {quizzes.filter(q => ((q.score || 0) / (q.noOfQuestions || 1)) * 100 >= 40).length}
                            </div>
                            <div className="sd-stat-label">Passed</div>
                        </div>
                    </div>
                    <div className="sd-stat-card">
                        <span className="sd-stat-icon">📈</span>
                        <div>
                            <div className="sd-stat-num">
                                {quizzes.length > 0
                                    ? Math.round(
                                        (quizzes.reduce((acc, q) => acc + (q.score || 0), 0) /
                                            quizzes.reduce((acc, q) => acc + (q.noOfQuestions || 0), 0)) * 100
                                    )
                                    : 0}%
                            </div>
                            <div className="sd-stat-label">Avg. Score</div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="sd-table-section">
                    <div className="sd-table-header">
                        <h2 className="sd-table-title">Attempted Quizzes</h2>
                        <span className="sd-table-count">{quizzes.length} total</span>
                    </div>
                    <div className="sd-table-wrapper">
                        <QuizzesAttemptedTable quizzes={quizzes} />
                    </div>
                </div>

            </main>
        </div>
    );
}

export default StudentDashboard;