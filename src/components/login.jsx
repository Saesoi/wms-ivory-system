import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="auth">
      <div className="auth__container">

        <Link to="/" className="auth__back">
          ← Back to Home
        </Link>

        <div className="auth__brand">
          <Link to="/">IVORY LOUNGE</Link>
        </div>

        <div className="auth__header">
          <h1>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          <p>
            {isLogin
              ? "Sign in to manage your reservations and upcoming events."
              : "Create an account to reserve tables and exclusive events."}
          </p>
        </div>

        <form className="auth__form">

          {!isLogin && (
            <div className="form-group">
              <label>FULL NAME</label>
              <input
                type="text"
                placeholder="Juan Dela Cruz"
              />
            </div>
          )}

          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
              />
            </div>
          )}

          <button type="submit" className="auth__submit">
            {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
          </button>

        </form>

        <div className="auth__footer">
          {isLogin ? (
            <>
              <p>Don't have an account?</p>

              <button
                type="button"
                className="auth__toggle"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <p>Already have an account?</p>

              <button
                type="button"
                className="auth__toggle"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </div>

      </div>
    </section>
  );
}