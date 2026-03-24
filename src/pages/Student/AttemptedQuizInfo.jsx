import { message, Spin } from 'antd';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dayjs from "dayjs";
import { getAttemptedQuizInfo } from "../../api/studentApi";
import "./Styles/AttemptedQuizInfo.css";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function AttemptedQuizInfo() {
    const quizCode = useParams().quiz_code;
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [blocked, setBlocked] = useState(false);

    useEffect(() => { fetchQuiz() }, [quizCode]);

    async function fetchQuiz() {
        try {
            const data = await getAttemptedQuizInfo(quizCode);
            setQuiz(data);
        } catch (error) {
            const errMsg = error.response?.data?.message || "Cannot load the quiz info";
            message.error(errMsg);
            setBlocked(true);
        } finally {
            setLoading(false);
        }
    }

    const getDifficultyClass = (difficulty) => {
        switch (difficulty?.toUpperCase()) {
            case 'EASY':   return 'sqi-badge-easy';
            case 'MEDIUM': return 'sqi-badge-medium';
            case 'HARD':   return 'sqi-badge-hard';
            default:       return 'sqi-badge-default';
        }
    };

    const getQuestionResult = (q) => {
        if (q.selectedOptText === "") return 'skipped';
        if (q.selectedOptText === q.correctOptText) return 'correct';
        return 'wrong';
    };

    const getOptionState = (opt, q) => {
        const isCorrect = q.correctOptText === opt.text;
        const isSelected = !!q.selectedOptText && q.selectedOptText === opt.text;  // "" won't match
        if (isCorrect && isSelected) return 'correct-selected';
        if (isCorrect && !isSelected) return 'correct';
        if (isSelected && !isCorrect) return 'wrong-selected';
        return '';
    };

    if (loading) {
        return (
            <div className="sqi-loading">
                <div className="sqi-grid-overlay" />
                <Spin size="large" />
                <p className="sqi-loading-text">Loading your results...</p>
            </div>
        );
    }

    if (blocked) {
        return (
            <div className="sqi-root">
                <div className="sqi-grid-overlay" />
                <header className="sqi-topbar">
                    <div className="sqi-brand">EDU<span>PORTAL</span></div>
                    <button className="sqi-back-btn" onClick={() => navigate(-1)}>← Back</button>
                </header>
                <main className="sqi-main">
                    <div className="sqi-blocked">
                        <div className="sqi-blocked-icon">🔒</div>
                        <h2 className="sqi-blocked-title">Results Not Available Yet</h2>
                        <p className="sqi-blocked-sub">
                            Quiz results are only available after the quiz ends.<br />
                            Please check back once the end time has passed.
                        </p>
                        <div className="sqi-blocked-code">{quizCode}</div>
                        <button
                            className="sqi-blocked-btn"
                            onClick={() => navigate("/student/dashboard")}
                        >
                            Back to Dashboard →
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    const totalQuestions = quiz.questionList?.length || 0;
    const correctCount = quiz.questionList?.filter(
        q => !!q.selectedOptText && q.selectedOptText === q.correctOptText
    ).length || 0;
    const skippedCount = quiz.questionList?.filter(
        q => !q.selectedOptText  // catches "", null, undefined
    ).length || 0;
    const wrongCount = totalQuestions - correctCount - skippedCount;

    const resultConfig = {
        correct:  { className: 'result-correct',  label: '✓ Correct' },
        wrong:    { className: 'result-wrong',    label: '✗ Wrong'   },
        skipped:  { className: 'result-skipped',  label: '— Skipped' },
    };

    return (
        <div className="sqi-root">
            <div className="sqi-grid-overlay" />

            <header className="sqi-topbar">
                <div className="sqi-brand">EDU<span>PORTAL</span></div>
                <button className="sqi-back-btn" onClick={() => navigate(-1)}>← Back</button>
            </header>

            <main className="sqi-main">

                <div className="sqi-page-header">
                    <div className="sqi-badge">QUIZ REVIEW</div>
                    <h1 className="sqi-page-title">Your Results</h1>
                    <p className="sqi-page-sub">Review your answers and see the correct solutions</p>
                </div>

                {/* Info Card */}
                <div className="sqi-info-card">
                    <div className="sqi-info-grid">
                        <div className="sqi-info-item">
                            <span className="sqi-info-label">Quiz Code</span>
                            <span className="sqi-code">{quiz.code}</span>
                        </div>
                        <div className="sqi-info-item">
                            <span className="sqi-info-label">Topic</span>
                            <span className="sqi-info-value">{quiz.topic}</span>
                        </div>
                        <div className="sqi-info-item">
                            <span className="sqi-info-label">Difficulty</span>
                            <span className={`sqi-diff-badge ${getDifficultyClass(quiz.difficulty)}`}>
                                {quiz.difficulty}
                            </span>
                        </div>
                        <div className="sqi-info-item">
                            <span className="sqi-info-label">No. of Questions</span>
                            <span className="sqi-info-value">{quiz.noOfQuestions}</span>
                        </div>
                        <div className="sqi-info-item">
                            <span className="sqi-info-label">Start Time</span>
                            <span className="sqi-time">{dayjs.utc(quiz.startTime).tz("Asia/Kolkata").format("DD MMM YYYY, HH:mm")}</span>
                        </div>
                        <div className="sqi-info-item">
                            <span className="sqi-info-label">End Time</span>
                            <span className="sqi-time">{dayjs.utc(quiz.endTime).tz("Asia/Kolkata").format("DD MMM YYYY, HH:mm")}</span>
                        </div>
                    </div>
                </div>

                {/* Score Card */}
                <div className="sqi-score-card">
                    <div className="sqi-score-left">
                        <p className="sqi-score-label">YOUR SCORE</p>
                        <p className="sqi-score-num">{quiz.score}</p>
                    </div>
                    <div className="sqi-score-divider" />
                    <div className="sqi-score-stats">
                        <div className="sqi-score-stat">
                            <span className="sqi-stat-num correct-num">{correctCount}</span>
                            <span className="sqi-stat-label">Correct</span>
                        </div>
                        <div className="sqi-score-stat">
                            <span className="sqi-stat-num wrong-num">{wrongCount}</span>
                            <span className="sqi-stat-label">Wrong</span>
                        </div>
                        <div className="sqi-score-stat">
                            <span className="sqi-stat-num skipped-num">{skippedCount}</span>
                            <span className="sqi-stat-label">Skipped</span>
                        </div>
                        <div className="sqi-score-stat">
                            <span className="sqi-stat-num">{totalQuestions}</span>
                            <span className="sqi-stat-label">Total</span>
                        </div>
                    </div>
                    <div className="sqi-score-bar-wrap">
                        <p className="sqi-score-bar-label">Accuracy</p>
                        <div className="sqi-score-bar">
                            <div
                                className="sqi-score-bar-fill"
                                style={{ width: `${totalQuestions > 0 ? (correctCount / (wrongCount + correctCount)) * 100 : 0}%` }}
                            />
                        </div>
                        <p className="sqi-score-bar-pct">
                            {totalQuestions > 0 ? Math.round((correctCount / (wrongCount + correctCount)) * 100) : 0}%
                        </p>
                    </div>
                </div>

                {/* Legend */}
                <div className="sqi-legend">
                    <div className="sqi-legend-item">
                        <span className="sqi-legend-dot correct-selected-dot" /> Correct — your answer
                    </div>
                    <div className="sqi-legend-item">
                        <span className="sqi-legend-dot correct-dot" /> Correct — missed
                    </div>
                    <div className="sqi-legend-item">
                        <span className="sqi-legend-dot wrong-dot" /> Wrong — your answer
                    </div>
                    <div className="sqi-legend-item">
                        <span className="sqi-legend-dot skipped-dot" /> Skipped
                    </div>
                </div>

                {/* Section Header */}
                <div className="sqi-section-header">
                    <h2 className="sqi-section-title">Question Review</h2>
                    <span className="sqi-section-count">{totalQuestions} questions</span>
                </div>

                {/* Questions */}
                <div className="sqi-questions">
                    {quiz.questionList?.map((q, index) => {
                        const result = getQuestionResult(q);
                        const { className, label } = resultConfig[result];
                        return (
                            <div key={index} className="sqi-q-card">
                                <div className="sqi-q-header">
                                    <span className="sqi-q-number">Q{index + 1}</span>
                                    <span className="sqi-q-text">{q.questionText}</span>
                                    <span className={`sqi-q-result ${className}`}>{label}</span>
                                </div>
                                <div className="sqi-options">
                                    {[
                                        { label: 'A', text: q.optAText },
                                        { label: 'B', text: q.optBText },
                                        { label: 'C', text: q.optCText },
                                        { label: 'D', text: q.optDText },
                                    ].map((opt) => {
                                        const state = getOptionState(opt, q);
                                        return (
                                            <div key={opt.label} className={`sqi-option ${state}`}>
                                                <span className="sqi-opt-label">{opt.label}</span>
                                                <span className="sqi-opt-text">{opt.text}</span>
                                                <div className="sqi-opt-tags">
                                                    {!!q.selectedOptText && q.selectedOptText === opt.text && (
                                                        <span className="sqi-tag sqi-tag-selected">Your Answer</span>
                                                    )}
                                                    {q.correctOptText === opt.text && (
                                                        <span className="sqi-tag sqi-tag-correct">✓ Correct</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </main>
        </div>
    );
}

export default AttemptedQuizInfo;