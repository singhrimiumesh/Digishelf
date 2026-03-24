import { useState } from "react";
import { useLibrary } from "../context/librarycontext";
import "./login.css";

export default function Login({ onLogin }) {
  const { register, login, authError } = useLibrary();

  const [form, setForm]       = useState({ name: "", email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!isLogin && !form.name) {
      setError("Please enter your name.");
      return;
    }
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    if (isLogin) {
      // ── LOGIN MODE ──
      const success = await login({
        email:    form.email,
        password: form.password,
      });

      if (success) {
        onLogin();
      } else {
        setError(authError || "Invalid email or password.");
      }

    } else {
      // ── REGISTER MODE ──
      let success = await register(form);

      // If email already exists, auto-switch to login
      if (!success && authError === "Email already registered") {
        setError("Email already registered. Logging you in...");
        success = await login({
          email:    form.email,
          password: form.password,
        });
      }

      if (success) {
        onLogin();
      } else {
        setError(authError || "Something went wrong. Try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="grid-overlay" />
      </div>

      {/* ── LEFT SIDE ── */}
      <div className="login-left">
        <div className="login-brand">
          <span className="brand-icon">📚</span>
          <span className="brand-name">DigiShelf</span>
        </div>

        <h1 className="login-headline">
          Knowledge is the<br />
          <span>Greatest Wealth.</span>
        </h1>

        <p className="login-tagline">
          Access thousands of technical books, research papers,<br />
          and learning resources — all in one place.
        </p>

        <div className="login-stats">
          <div className="stat">
            <strong>12,000+</strong>
            <span>Books</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>800+</strong>
            <span>Authors</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <strong>50+</strong>
            <span>Subjects</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT SIDE ── */}
      <div className="login-right">
        <div className="login-card">

          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="login-sub">
            {isLogin
              ? "Sign in to access your library"
              : "Register to start your reading journey"}
          </p>

          <form onSubmit={handleSubmit} className="login-form">

            {/* Name field — only show on Register */}
            {!isLogin && (
              <div className="field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Ravi Singh"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>
            )}

            {/* Email */}
            <div className="field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* Password */}
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="login-error">⚠ {error}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className={`login-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In →"
                : "Register →"}
            </button>

          </form>

          {/* Toggle between login and register */}
          <div className="login-toggle">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button
                  className="toggle-btn"
                  onClick={() => {
                    setIsLogin(false);
                    setError("");
                    setForm({ name: "", email: "", password: "" });
                  }}
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  className="toggle-btn"
                  onClick={() => {
                    setIsLogin(true);
                    setError("");
                    setForm({ name: "", email: "", password: "" });
                  }}
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>

          <p className="login-hint">
            {isLogin
              ? "Use the email and password you registered with"
              : "Fill all fields to create your account"}
          </p>

        </div>
      </div>
    </div>
  );
}