import { message, Spin } from 'antd';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dayjs from "dayjs";
import { getQuizInfo } from "../../api/teacherApi";
import "./Styles/QuizInfo.css";

function QuizInfo() {
    const quizCode = useParams().quiz_code;
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchQuiz() }, [quizCode]);

    async function fetchQuiz() {
        try {
            const data = await getQuizInfo(quizCode);
            setQuiz(data);
        } catch (error) {
            message.error(error.response?.data?.message || "Cannot load the quiz info");
        } finally {
            setLoading(false);
        }
    }

    const getDifficultyClass = (difficulty) => {
        switch (difficulty?.toUpperCase()) {
            case 'EASY':   return 'badge-easy';
            case 'MEDIUM': return 'badge-medium';
            case 'HARD':   return 'badge-hard';
            default:       return 'badge-default';
        }
    };

    if (loading) {
        return (
            <div className="qi-loading">
                <div className="qi-grid-overlay" />
                <Spin size="large" />
                <p className="qi-loading-text">Loading quiz info...</p>
            </div>
        );
    }

    return (
        <div className="qi-root">
            <div className="qi-grid-overlay" />

            {/* Topbar */}
            <header className="qi-topbar">
                <div className="qi-brand">EDU<span>PORTAL</span></div>
                <div className="qi-topbar-right">
                    <button className="qi-back-btn" onClick={() => navigate(-1)}>
                        ← Back
                    </button>
                </div>
            </header>

            <main className="qi-main">

                {/* Page Title */}
                <div className="qi-page-header">
                    <div className="qi-badge">QUIZ INFO</div>
                    <h1 className="qi-page-title">Quiz Details</h1>
                    <p className="qi-page-sub">Review all information and questions for this quiz</p>
                </div>

                {/* Info Card */}
                <div className="qi-info-card">
                    <div className="qi-info-grid">

                        <div className="qi-info-item">
                            <span className="qi-info-label">Quiz Code</span>
                            <span className="qi-code">{quiz.code}</span>
                        </div>

                        <div className="qi-info-item">
                            <span className="qi-info-label">Topic</span>
                            <span className="qi-info-value">{quiz.topic}</span>
                        </div>

                        <div className="qi-info-item">
                            <span className="qi-info-label">Difficulty</span>
                            <span className={`qi-diff-badge ${getDifficultyClass(quiz.difficulty)}`}>
                                {quiz.difficulty}
                            </span>
                        </div>

                        <div className="qi-info-item">
                            <span className="qi-info-label">No. of Questions</span>
                            <span className="qi-info-value">{quiz.noOfQuestions}</span>
                        </div>

                        <div className="qi-info-item">
                            <span className="qi-info-label">Start Time</span>
                            <span className="qi-time">{dayjs(quiz.startTime).format("DD MMM YYYY, HH:mm")}</span>
                        </div>

                        <div className="qi-info-item">
                            <span className="qi-info-label">End Time</span>
                            <span className="qi-time">{dayjs(quiz.endTime).format("DD MMM YYYY, HH:mm")}</span>
                        </div>

                    </div>
                </div>

                {/* Questions */}
                <div className="qi-section-header">
                    <h2 className="qi-section-title">Questions</h2>
                    <span className="qi-section-count">{quiz.questionList?.length} questions</span>
                </div>

                <div className="qi-questions">
                    {quiz.questionList?.map((q, index) => (
                        <div key={index} className="qi-q-card">
                            <div className="qi-q-header">
                                <span className="qi-q-number">Q{index + 1}</span>
                                <span className="qi-q-text">{q.questionText}</span>
                            </div>

                            <div className="qi-options">
                                {[
                                    { label: 'A', text: q.optAText },
                                    { label: 'B', text: q.optBText },
                                    { label: 'C', text: q.optCText },
                                    { label: 'D', text: q.optDText },
                                ].map((opt) => (
                                    <div
                                        key={opt.label}
                                        className={`qi-option ${q.correctOptText === opt.text ? 'correct' : ''}`}
                                    >
                                        <span className="qi-opt-label">{opt.label}</span>
                                        <span className="qi-opt-text">{opt.text}</span>
                                        {q.correctOptText === opt.text && (
                                            <span className="qi-correct-badge">✓ Correct</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}

export default QuizInfo;