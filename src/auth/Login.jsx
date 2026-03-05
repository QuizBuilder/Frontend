// Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from "antd";
import api from "../api/axios";
import "./Styles/Login.css";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function onFinish(values) {
        setLoading(true);
        try {
            const response = await api.post("user/auth/signin", values);
            const token = response.data.jwtToken;
            const role = response.data.role;
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            if (role === "STUDENT") {
                navigate("/student/dashboard");
            } else {
                navigate("/teacher/dashboard");
            }
            message.success("Login Successful");
        } catch {
            message.error("Login Failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-root">
            <div className="grid-overlay" />

            {/* Left Panel */}
            <div className="login-left">
                <div className="left-content">
                    <div className="brand-logo">EDU<span>PORTAL</span></div>
                    <h2 className="left-heading">Learn without<br />limits.</h2>
                    <p className="left-sub">Your personalized learning experience awaits. Sign in to access your dashboard, track progress, and connect with your teachers.</p>
                    <div className="left-stats">
                        <div className="stat">
                            <span className="stat-num">12k+</span>
                            <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-num">340+</span>
                            <span className="stat-label">Courses</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat">
                            <span className="stat-num">98%</span>
                            <span className="stat-label">Satisfaction</span>
                        </div>
                    </div>
                </div>
                <div className="left-glow" />
            </div>

            {/* Right Panel */}
            <div className="login-right">
                <div className="login-card">
                    <div className="login-badge">SECURE PORTAL</div>
                    <h1 className="login-title">Welcome back</h1>
                    <p className="login-subtitle">Sign in to continue to your dashboard</p>

                    <Form onFinish={onFinish} layout="vertical">
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please enter your email" },
                                { type: "email", message: "Enter a valid email" }
                            ]}
                        >
                            <Input placeholder="you@example.com" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: "Please enter your password" }
                            ]}
                        >
                            <Input.Password placeholder="••••••••" />
                        </Form.Item>

                        <div className="login-divider" />

                        <Button
                            className="login-btn"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            {loading ? "Signing in…" : "Sign In →"}
                        </Button>
                    </Form>

                    <p className="login-footer">
                        Protected by <span>256-bit encryption</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;