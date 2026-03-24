import { message, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentProfile } from "../../api/studentApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import "./Styles/StudentProfile.css";

function StudentProfile() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchProfile(); }, []);

    async function fetchProfile() {
        try {
            const data = await getStudentProfile();
            setProfile(data);
        } catch (error) {
            message.error(error.response?.data?.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    }

    const getLevelColor = (level) => {
        switch (level?.toUpperCase()) {
            case 'BEGINNER':     return { color: '#34d399', bg: 'rgba(52,211,153,0.1)',   border: 'rgba(52,211,153,0.25)' };
            case 'INTERMEDIATE': return { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',   border: 'rgba(251,191,36,0.25)' };
            case 'ADVANCED':     return { color: '#f87171', bg: 'rgba(248,113,113,0.1)',  border: 'rgba(248,113,113,0.25)' };
            case 'EXPERT':       return { color: '#818cf8', bg: 'rgba(129,140,248,0.1)',  border: 'rgba(129,140,248,0.25)' };
            default:             return { color: '#64748b', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' };
        }
    };

    const chartData = profile?.prevRatings?.map((rating, index) => ({
        quiz: `#${index + 1}`,
        rating: parseFloat(rating.toFixed(1)),
    })) || [];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="sp-tooltip">
                    <p className="sp-tooltip-label">Quiz {label}</p>
                    <p className="sp-tooltip-value">{payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="sp-loading">
                <div className="sp-grid-overlay" />
                <Spin size="large" />
                <p className="sp-loading-text">Loading profile...</p>
            </div>
        );
    }

    const levelStyle = getLevelColor(profile?.level);
    const avgRating = chartData.length > 0
        ? parseFloat((chartData.reduce((sum, d) => sum + d.rating, 0) / chartData.length).toFixed(1))
        : 0;
    const maxRating = chartData.length > 0 ? Math.max(...chartData.map(d => d.rating)) : 0;
    const trend = chartData.length >= 2
        ? chartData[chartData.length - 1].rating - chartData[chartData.length - 2].rating
        : 0;

    return (
        <div className="sp-root">
            <div className="sp-grid-overlay" />
            <div className="sp-glow sp-glow-1" />
            <div className="sp-glow sp-glow-2" />

            {/* Topbar */}
            <header className="sp-topbar">
                <div className="sp-brand">EDU<span>PORTAL</span></div>
                <button className="sp-back-btn" onClick={() => navigate(-1)}>← Back</button>
            </header>

            <main className="sp-main">

                {/* Profile Header */}
                <div className="sp-profile-header">
                    <div className="sp-avatar">
                        {profile?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="sp-profile-info">
                        <div className="sp-profile-top">
                            <h1 className="sp-name">{profile?.name}</h1>
                            <span
                                className="sp-level-badge"
                                style={{
                                    color: levelStyle.color,
                                    background: levelStyle.bg,
                                    border: `1px solid ${levelStyle.border}`
                                }}
                            >
                                {profile?.level}
                            </span>
                        </div>
                        <p className="sp-email">{profile?.emailId}</p>
                        <p className="sp-role">{profile?.role}</p>
                    </div>
                    <div className="sp-rating-badge">
                        <p className="sp-rating-label">CURRENT RATING</p>
                        <p className="sp-rating-num">{profile?.rating?.toFixed(1)}</p>
                        {trend !== 0 && (
                            <p className={`sp-trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
                                {trend > 0 ? '▲' : '▼'} {Math.abs(trend).toFixed(1)}
                            </p>
                        )}
                    </div>
                </div>

                {/* Stats Row */}
                <div className="sp-stats-row">
                    <div className="sp-stat-card">
                        <span className="sp-stat-icon">📝</span>
                        <div>
                            <p className="sp-stat-num">{profile?.totalQs}</p>
                            <p className="sp-stat-label">Total Questions</p>
                        </div>
                    </div>
                    <div className="sp-stat-card">
                        <span className="sp-stat-icon">✅</span>
                        <div>
                            <p className="sp-stat-num correct-num">{profile?.correctAns}</p>
                            <p className="sp-stat-label">Correct Answers</p>
                        </div>
                    </div>
                    <div className="sp-stat-card">
                        <span className="sp-stat-icon">🎯</span>
                        <div>
                            <p className="sp-stat-num">{(profile?.accuracy * 100).toFixed(1)}%</p>
                            <p className="sp-stat-label">Accuracy</p>
                        </div>
                    </div>
                    <div className="sp-stat-card">
                        <span className="sp-stat-icon">🏆</span>
                        <div>
                            <p className="sp-stat-num">{profile?.prevRatings?.length || 0}</p>
                            <p className="sp-stat-label">Quizzes Taken</p>
                        </div>
                    </div>
                </div>

                {/* Accuracy Bar */}
                <div className="sp-accuracy-card">
                    <div className="sp-accuracy-header">
                        <span className="sp-accuracy-title">Overall Accuracy</span>
                        <span className="sp-accuracy-pct">{(profile?.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="sp-accuracy-bar">
                        <div
                            className="sp-accuracy-fill"
                            style={{ width: `${profile?.accuracy*100 || 0}%` }}
                        />
                    </div>
                    <div className="sp-accuracy-sub">
                        <span>{profile?.correctAns} correct out of {profile?.totalQs} total questions</span>
                    </div>
                </div>

                {/* Rating Graph */}
                <div className="sp-graph-card">
                    <div className="sp-graph-header">
                        <div>
                            <h2 className="sp-graph-title">Rating History</h2>
                            <p className="sp-graph-sub">Your rating progression over all quizzes</p>
                        </div>
                        <div className="sp-graph-meta">
                            <div className="sp-graph-stat">
                                <span className="sp-graph-stat-val">{avgRating}</span>
                                <span className="sp-graph-stat-label">Avg</span>
                            </div>
                            <div className="sp-graph-stat">
                                <span className="sp-graph-stat-val">{maxRating}</span>
                                <span className="sp-graph-stat-label">Peak</span>
                            </div>
                        </div>
                    </div>

                    {chartData.length === 0 ? (
                        <div className="sp-graph-empty">
                            <span>📊</span>
                            <p>No rating history yet</p>
                            <p>Attempt quizzes to see your progress</p>
                        </div>
                    ) : (
                        <div className="sp-graph-wrap">
                            <ResponsiveContainer width="100%" height={280}>
                                <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="ratingGradient" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#a78bfa" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="quiz"
                                        tick={{ fill: '#475569', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                                        axisLine={{ stroke: 'rgba(255,255,255,0.07)' }}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fill: '#475569', fontSize: 12, fontFamily: 'JetBrains Mono' }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={40}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <ReferenceLine
                                        y={avgRating}
                                        stroke="rgba(251,191,36,0.3)"
                                        strokeDasharray="4 4"
                                        label={{ value: 'avg', fill: '#fbbf24', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="rating"
                                        stroke="url(#ratingGradient)"
                                        strokeWidth={2.5}
                                        dot={{ fill: '#6366f1', strokeWidth: 2, r: 4, stroke: '#0a0a0f' }}
                                        activeDot={{ r: 6, fill: '#a78bfa', stroke: '#0a0a0f', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}

export default StudentProfile;