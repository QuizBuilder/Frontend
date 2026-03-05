import { Button, Input, Form, message } from "antd";
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Styles/AttemptQuiz.css";

function AttemptQuiz() {
    const navigate = useNavigate();

    function onFinish(values) {
        try {
            navigate(`/student/${values.quizCode}/attempt_quiz`);
        } catch {
            message.error("Couldn't Fetch Quiz. Quiz is not yet started or enter code properly");
        }
    }

    return (
        <div className="aq-root">
            <div className="aq-grid-overlay" />

            {/* Left Panel */}
            <div className="aq-left">
                <div className="aq-left-content">
                    <div className="aq-brand">EDU<span>PORTAL</span></div>
                    <h2 className="aq-left-heading">Ready to<br />test yourself?</h2>
                    <p className="aq-left-sub">Enter your quiz code to begin. Make sure you're in a quiet place — once started, the timer won't stop.</p>
                    <div className="aq-tips">
                        <p className="aq-tips-title">Before you start</p>
                        <ul className="aq-tips-list">
                            <li>📶 Check your internet connection</li>
                            <li>⏱ Keep an eye on the timer</li>
                            <li>🔇 Minimize distractions</li>
                            <li>✅ Answer all questions before submitting</li>
                        </ul>
                    </div>
                </div>
                <div className="aq-left-glow" />
            </div>

            {/* Right Panel */}
            <div className="aq-right">
                <div className="aq-card">
                    <div className="aq-badge">ENTER QUIZ</div>
                    <h1 className="aq-title">Join a Quiz</h1>
                    <p className="aq-subtitle">Paste or type your quiz code below</p>

                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Quiz Code"
                            name="quizCode"
                            rules={[{ required: true, message: "Please enter quiz code" }]}
                        >
                            <Input placeholder="e.g. QUIZ-2024-XYZ" className="aq-input" />
                        </Form.Item>

                        <div className="aq-divider" />

                        <Button className="aq-btn" htmlType="submit" block>
                            Enter Quiz →
                        </Button>
                    </Form>

                    <p className="aq-footer">
                        Back to <span onClick={() => navigate("/student/dashboard")}>Dashboard</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AttemptQuiz;