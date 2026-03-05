import { Radio, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuiz, submitQuizAPI } from "../../api/studentApi";
import "./Styles/QuizQuestions.css";

function QuizQuestions() {
  const { quiz_code: code } = useParams();
  const navigate = useNavigate();

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const data = await getQuiz(code);
        setQuizQuestions(data.quizQuestions);
        const end = new Date(data.endTime).getTime();
        const now = new Date().getTime();
        const diff = Math.floor((end - now) / 1000);
        setTimeLeft(diff > 0 ? diff : 0);
      } catch (error) {
        message.error(error.response?.data?.message || "Failed to load quiz");
      }
    };
    if (code) fetchQuizQuestions();
  }, [code]);

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, submitted]);

  function handleChange(questionId, optionId) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAutoSubmit = async () => {
    if (submitted) return;
    message.warning("Time is up! Auto submitting...");
    await submitQuiz();
  };

  async function submitQuiz() {
    if (submitted) return;
    try {
      setSubmitted(true);
      const payload = Object.keys(answers).map((questionId) => ({
        questionId: Number(questionId),
        selectedOptionId: answers[questionId],
      }));
      const data = await submitQuizAPI(code, payload);
      message.success(`Your score: ${data.score}`);
      setTimeout(() => navigate("/student/dashboard"), 2000);
    } catch (error) {
      setSubmitted(false);
      message.error(error.response?.data?.message || "Failed to submit quiz");
    }
  }

  const answeredCount = Object.keys(answers).length;
  const totalCount = quizQuestions.length;
  const isUrgent = timeLeft < 60 && timeLeft > 0;

  return (
    <div className="qq-root">
      <div className="qq-grid-overlay" />

      {/* Top Bar */}
      <header className="qq-topbar">
        <div className="qq-brand">EDU<span>PORTAL</span></div>

        <div className={`qq-timer ${isUrgent ? "urgent" : ""}`}>
          <span className="qq-timer-icon">{isUrgent ? "⚠️" : "⏱"}</span>
          <span className="qq-timer-label">Time Left</span>
          <span className="qq-timer-value">{formatTime(timeLeft)}</span>
        </div>

        <div className="qq-progress-info">
          <span className="qq-progress-text">{answeredCount} / {totalCount} answered</span>
          <div className="qq-progress-bar">
            <div
              className="qq-progress-fill"
              style={{ width: totalCount > 0 ? `${(answeredCount / totalCount) * 100}%` : "0%" }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="qq-main">

        {/* Question Navigator */}
        <aside className="qq-navigator">
          <p className="qq-nav-title">Questions</p>
          <div className="qq-nav-grid">
            {quizQuestions.map((q, index) => (
              <a
                key={q.questionId}
                href={`#q-${q.questionId}`}
                className={`qq-nav-dot ${answers[q.questionId] ? "answered" : ""}`}
              >
                {index + 1}
              </a>
            ))}
          </div>
          <div className="qq-nav-legend">
            <span className="qq-legend-dot answered" /> Answered
            <span className="qq-legend-dot" style={{ marginLeft: 12 }} /> Unanswered
          </div>

          {quizQuestions.length > 0 && (
            <Button
              className="qq-submit-btn-side"
              onClick={submitQuiz}
              disabled={submitted}
              block
            >
              {submitted ? "Submitted ✓" : "Submit Quiz →"}
            </Button>
          )}
        </aside>

        {/* Questions List */}
        <div className="qq-questions">
          {quizQuestions.map((q, index) => (
            <div
              key={q.questionId}
              id={`q-${q.questionId}`}
              className={`qq-card ${answers[q.questionId] ? "answered" : ""}`}
            >
              <div className="qq-card-header">
                <span className="qq-q-number">Q{index + 1}</span>
                <span className="qq-q-text">{q.questionText}</span>
                {answers[q.questionId] && (
                  <span className="qq-answered-badge">✓ Answered</span>
                )}
              </div>

              <Radio.Group
                className="qq-options"
                onChange={(e) => handleChange(q.questionId, e.target.value)}
                value={answers[q.questionId]}
              >
                {[
                  { id: q.optAId, label: "A", text: q.optAText },
                  { id: q.optBId, label: "B", text: q.optBText },
                  { id: q.optCId, label: "C", text: q.optCText },
                  { id: q.optDId, label: "D", text: q.optDText },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`qq-option ${answers[q.questionId] === opt.id ? "selected" : ""}`}
                    onClick={() => handleChange(q.questionId, opt.id)}
                  >
                    <span className="qq-opt-label">{opt.label}</span>
                    <span className="qq-opt-text">{opt.text}</span>
                    <Radio value={opt.id} className="qq-hidden-radio" />
                  </label>
                ))}
              </Radio.Group>
            </div>
          ))}

          {/* Bottom Submit */}
          {quizQuestions.length > 0 && (
            <Button
              className="qq-submit-btn-bottom"
              onClick={submitQuiz}
              disabled={submitted}
              block
            >
              {submitted ? "Submitted ✓" : "Submit Quiz →"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

export default QuizQuestions;