import React, { useState } from 'react'
import { Form, Input, Button, message, Radio } from "antd";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./Styles/Register.css";

function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function onFinish(values) {
        setLoading(true);
        try {
            await api.post("user/auth/signup", values);
            navigate("/login");
        } catch (error) {
            message.error("Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-root">
            <div className="grid-overlay" />

            {/* Left Panel */}
            <div className="register-left">
                <div className="left-content">
                    <div className="brand-logo">EDU<span>PORTAL</span></div>
                    <h2 className="left-heading">Start your<br />journey today.</h2>
                    <p className="left-sub">Join thousands of students and teachers on a platform built for modern learning. Create your account in seconds.</p>
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
            <div className="register-right">
                <div className="register-card">
                    <div className="register-badge">CREATE ACCOUNT</div>
                    <h1 className="register-title">Get started</h1>
                    <p className="register-subtitle">Fill in your details to create your account</p>

                    <Form onFinish={onFinish} layout="vertical">
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Please enter your name" }]}
                        >
                            <Input placeholder="John Doe" />
                        </Form.Item>

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
                            rules={[{ required: true, message: "Please enter your password" }]}
                        >
                            <Input.Password placeholder="••••••••" />
                        </Form.Item>

                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: "Please select a role" }]}
                        >
                            <div className="role-selector">
                                <Radio.Group style={{ width: '100%' }}>
                                    <div className="role-options">
                                        <Radio value="STUDENT" className="role-radio">
                                            <div className="role-card">
                                                <span className="role-icon">🎓</span>
                                                <span className="role-label">Student</span>
                                                <span className="role-desc">Access courses & track progress</span>
                                            </div>
                                        </Radio>
                                        <Radio value="TEACHER" className="role-radio">
                                            <div className="role-card">
                                                <span className="role-icon">📚</span>
                                                <span className="role-label">Teacher</span>
                                                <span className="role-desc">Create & manage courses</span>
                                            </div>
                                        </Radio>
                                    </div>
                                </Radio.Group>
                            </div>
                        </Form.Item>

                        <div className="register-divider" />

                        <Button
                            className="register-btn"
                            htmlType="submit"
                            loading={loading}
                            block
                        >
                            {loading ? "Creating account…" : "Create Account →"}
                        </Button>
                    </Form>

                    <p className="register-footer">
                        Already have an account? <span onClick={() => navigate("/login")}>Sign in</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;