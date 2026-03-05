import { message } from 'antd';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import LeaderBoardTable from './Student/LeaderBoardTable';
import { getLeaderBoard } from "../api/commonApi";
import "./Styles/LeaderBoard.css";

function LeaderBoard() {
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [loading, setLoading] = useState(true);
    const code = useParams().quiz_code;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaderBoard = async () => {
            try {
                const data = await getLeaderBoard(code);
                setLeaderBoard(data);
            } catch (error) {
                message.error(
                    error.response?.data?.message || "Unable to fetch leaderboard"
                );
            } finally {
                setLoading(false);
            }
        };
        if (code) fetchLeaderBoard();
    }, [code]);

    const topThree = leaderBoard.slice(0, 3);

    return (
        <div className="lb-root">
            <div className="lb-grid-overlay" />
            <div className="lb-glow lb-glow-1" />
            <div className="lb-glow lb-glow-2" />

            {/* Topbar */}
            <header className="lb-topbar">
                <div className="lb-brand">EDU<span>PORTAL</span></div>
                <div className="lb-topbar-center">
                    <span className="lb-topbar-badge">🏆 LEADERBOARD</span>
                </div>
                <button className="lb-back-btn" onClick={() => navigate(-1)}>← Back</button>
            </header>

            <main className="lb-main">

                {/* Page Header */}
                <div className="lb-page-header">
                    <h1 className="lb-page-title">Quiz Leaderboard</h1>
                    <p className="lb-page-sub">
                        <span className="lb-code">{code}</span>
                    </p>
                </div>

                {/* Podium — top 3 */}
                {!loading && topThree.length >= 3 && (
                    <div className="lb-podium">
                        {/* 2nd place */}
                        <div className="lb-podium-item lb-podium-second">
                            <div className="lb-podium-avatar silver">
                                {topThree[1]?.name?.charAt(0).toUpperCase()}
                            </div>
                            <p className="lb-podium-name">{topThree[1]?.name}</p>
                            <p className="lb-podium-score">{topThree[1]?.score}</p>
                            <div className="lb-podium-block silver">
                                <span>2nd</span>
                            </div>
                        </div>

                        {/* 1st place */}
                        <div className="lb-podium-item lb-podium-first">
                            <div className="lb-podium-crown">👑</div>
                            <div className="lb-podium-avatar gold">
                                {topThree[0]?.name?.charAt(0).toUpperCase()}
                            </div>
                            <p className="lb-podium-name">{topThree[0]?.name}</p>
                            <p className="lb-podium-score">{topThree[0]?.score}</p>
                            <div className="lb-podium-block gold">
                                <span>1st</span>
                            </div>
                        </div>

                        {/* 3rd place */}
                        <div className="lb-podium-item lb-podium-third">
                            <div className="lb-podium-avatar bronze">
                                {topThree[2]?.name?.charAt(0).toUpperCase()}
                            </div>
                            <p className="lb-podium-name">{topThree[2]?.name}</p>
                            <p className="lb-podium-score">{topThree[2]?.score}</p>
                            <div className="lb-podium-block bronze">
                                <span>3rd</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Full Table */}
                <div className="lb-table-section">
                    <div className="lb-table-header">
                        <h2 className="lb-table-title">All Rankings</h2>
                        <span className="lb-table-count">{leaderBoard.length} participants</span>
                    </div>
                    {loading ? (
                        <div className="lb-loading">
                            <div className="lb-spinner" />
                            <p>Loading leaderboard...</p>
                        </div>
                    ) : (
                        <LeaderBoardTable leaderBoard={leaderBoard} />
                    )}
                </div>

            </main>
        </div>
    );
}

export default LeaderBoard;