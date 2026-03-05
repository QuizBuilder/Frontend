import { useNavigate } from "react-router-dom";
import "./Styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-root">
      <div className="home-grid-overlay" />

      {/* Ambient glows */}
      <div className="home-glow home-glow-1" />
      <div className="home-glow home-glow-2" />
      <div className="home-glow home-glow-3" />

      {/* Navbar */}
      <nav className="home-nav">
        <div className="home-brand">EDU<span>PORTAL</span></div>
        <div className="home-nav-actions">
          <button className="home-nav-login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="home-nav-register" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="home-main">
        <div className="home-hero">
          <div className="home-hero-badge">✨ AI-Powered Quiz Platform</div>

          <h1 className="home-hero-title">
            Build smarter quizzes.<br />
            <span className="home-hero-accent">Powered by AI.</span>
          </h1>

          <p className="home-hero-sub">
            Create, schedule, and manage quizzes in seconds. Let AI generate
            questions while you focus on teaching.
          </p>

          <div className="home-hero-actions">
            <button className="home-btn-primary" onClick={() => navigate("/register")}>
              Get Started Free →
            </button>
            <button className="home-btn-ghost" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>

          {/* Stats */}
          <div className="home-stats">
            <div className="home-stat">
              <span className="home-stat-num">12k+</span>
              <span className="home-stat-label">Students</span>
            </div>
            <div className="home-stat-divider" />
            <div className="home-stat">
              <span className="home-stat-num">340+</span>
              <span className="home-stat-label">Quizzes Created</span>
            </div>
            <div className="home-stat-divider" />
            <div className="home-stat">
              <span className="home-stat-num">98%</span>
              <span className="home-stat-label">Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="home-features">
          <div className="home-feature-card">
            <span className="home-feature-icon">✨</span>
            <h3 className="home-feature-title">AI Generation</h3>
            <p className="home-feature-desc">Generate full quizzes instantly with our AI engine — just pick a topic and difficulty.</p>
          </div>
          <div className="home-feature-card">
            <span className="home-feature-icon">⏰</span>
            <h3 className="home-feature-title">Scheduled Quizzes</h3>
            <p className="home-feature-desc">Set precise start and end times. Students can only attempt during the window.</p>
          </div>
          <div className="home-feature-card">
            <span className="home-feature-icon">🏆</span>
            <h3 className="home-feature-title">Live Leaderboards</h3>
            <p className="home-feature-desc">Real-time rankings after every submission. Keep students engaged and motivated.</p>
          </div>
          <div className="home-feature-card">
            <span className="home-feature-icon">📊</span>
            <h3 className="home-feature-title">Score Analytics</h3>
            <p className="home-feature-desc">Track performance across quizzes with clear scores and progress indicators.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <span>© 2025 EduPortal. Built for modern learning.</span>
      </footer>
    </div>
  );
}

export default Home;
