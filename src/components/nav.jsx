import "./nav.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [loading, setLoading] =
  useState(true);

  const [notifications,
    setNotifications] =
    useState([]);

  const [showNotif,
    setShowNotif] =
    useState(false);

  const unreadCount =
  notifications.filter(
    n => n.is_read == 0
  ).length;

  useEffect(() => {
    const storedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    setUser(storedUser);

    setLoading(false);

    if(!storedUser) return;

    fetch(
      `http://localhost/api/get_notifications.php?user_id=${storedUser.id}`
    )
    .then(res => res.json())
    .then(data => {
      setNotifications(data);
    });

  }, []);

  return (
    <nav className="nav">
      {/* LEFT */}
      <div className="nav-left">
        <img
          className="logo"
          src="/src/assets/ivory-logo.jpg"
          alt="WMS Ivory Logo"
        />

        <div>
          <h3 className="gold nav-title">IVORY</h3>
          <p className="gray small-text">Lounge & Bar</p>
        </div>
      </div>

      {/* MIDDLE - Desktop */}
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
          <Link
            to="/login"
            className="login-link"
          >
            <button className="login-btn">
              Login
            </button>
          </Link>
        ) : (
          <>
          <div className="notif-wrap">
              <button
                className="icon-btn"
                onClick={() =>
                  setShowNotif(!showNotif)
                }
              >
                🔔
                {unreadCount > 0 && (
                  <span
                    className="notif-badge"
                  >
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
                          !n.is_read
                            ? "unread"
                            : ""
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
      </div>

      {/* Mobile Dropdown */}
      <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/reserve">Reservation</Link>
        <Link to="/events">Events</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}