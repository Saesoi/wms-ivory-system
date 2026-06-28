import "./nav.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../assets/ivory-logo.jpg";
import hamburgerIcon from "../assets/hamburger.png";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const unreadCount = notifications.filter(
    (n) => n.is_read == 0
  ).length;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setUser(storedUser);
    setLoading(false);

    if (!storedUser) return;

    fetch(
      `/api/get_notifications.php?user_id=${storedUser.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
      });
  }, []);

  return (
    <nav className="nav">

      {/* LEFT */}
      <div className="nav-left">
        <img
          className="logo"
          src={logo}
          alt="IVORY Logo"
        />

        <div>
          <h3 className="gold nav-title">IVORY</h3>
          <p className="gray small-text">Lounge & Bar</p>
        </div>
      </div>

      {/* CENTER (Desktop Only) */}
      <div className="nav-mid">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/reserve">Reservation</Link>
        <Link to="/events">Events</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {loading ? null : !user ? (
          <Link to="/login" className="login-link">
            <button className="login-btn">
              Login
            </button>
          </Link>
        ) : (
          <>
            {/* Notifications */}
            <div className="notif-wrap">
              <button
                className="icon-btn"
                onClick={() =>
                  setShowNotif(!showNotif)
                }
              >
                🔔

                {unreadCount > 0 && (
                  <span className="notif-badge">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotif && (
                <div className="notif-dropdown">

                  <div className="notif-header">
                    Notifications
                  </div>

                  {notifications.length === 0 ? (
                    <div className="notif-item">
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`notif-item ${
                          !n.is_read ? "unread" : ""
                        }`}
                      >
                        <div className="notif-item-title">
                          {n.title}
                        </div>

                        <div className="notif-item-time">
                          {n.created_at}
                        </div>
                      </div>
                    ))
                  )}

                </div>
              )}
            </div>

            {/* Profile */}
            <Link
              to={
                user.role === "admin"
                  ? "/admin"
                  : "/profile"
              }
            >
              <button
                className="icon-btn"
                title="Profile"
              >
                👤
              </button>
            </Link>
          </>
        )}

        {/* Hamburger (Mobile Only) */}
        <img
          className="hamburger"
          src={hamburgerIcon}
          alt="Menu"
          onClick={() => setIsOpen(!isOpen)}
        />

      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "show" : ""}`}>

        <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>

        <Link to="/about" onClick={() => setIsOpen(false)}>
          About
        </Link>

        <Link to="/reserve" onClick={() => setIsOpen(false)}>
          Reservation
        </Link>

        <Link to="/events" onClick={() => setIsOpen(false)}>
          Events
        </Link>

        <Link to="/contact" onClick={() => setIsOpen(false)}>
          Contact
        </Link>

        {!loading &&
          (!user ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          ) : (
            <Link
              to={
                user.role === "admin"
                  ? "/admin"
                  : "/profile"
              }
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          ))}

      </div>

    </nav>
  );
}