import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        setIsLogin(true);

        setFullname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!");

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    }
  };

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

        <form
          className="auth__form"
          onSubmit={isLogin ? handleLogin : handleSignup}
        >

          {!isLogin && (
            <div className="form-group">
              <label>FULL NAME</label>
              <input
                type="text"
                placeholder="Juan Dela Cruz"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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