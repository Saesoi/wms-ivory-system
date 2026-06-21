import "./nav.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

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
        <Link to="/login" className="login-link">
          <button className="login-btn">Login</button>
        </Link>

        <img
          className="hamburger"
          src="/src/assets/hamburger.png"
          alt="Hamburger Menu"
          onClick={() => setIsOpen(!isOpen)}
        />
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