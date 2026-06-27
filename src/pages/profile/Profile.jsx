import { useState, useEffect } from "react";
import "./Profile.css";
import Nav from "../../components/nav"

export default function Profile() {

  const [activePage, setActivePage] = useState("dashboard");

  const user = JSON.parse(localStorage.getItem("user"));

  const initials = user?.fullname
    ? user.fullname
        .split(" ")
        .map(name => name[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";
  
  const [bookings, setBookings] =
    useState([]);

  const [
    selectedBooking,
    setSelectedBooking
  ] = useState(null);

  const viewBooking = (booking) => {
    setSelectedBooking(booking);
  };

  const cancelBooking = async (id) => {
    if(
      !window.confirm(
        "Cancel this reservation?"
      )
    ) return;
    try {
      const response = await fetch(
        "http://localhost/api/cancel_reservation.php",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            id
          })
        }
      );
      const result =
        await response.json();
      if(result.success){
        setBookings(
          bookings.map((b) =>
            b.id === id
              ? {
                  ...b,
                  status: "Cancelled"
                }
              : b
          )
        );
      }
    } catch(error){
      console.error(error);
    }
  };

  useEffect(() => {
 
    if(user){

      fetch(
        `http://localhost/api/get_user_bookings.php?user_id=${user.id}`
      )
      .then(res => res.json())
      .then(data => {
        setBookings(data);
      });

    }

  }, []);

  const totalBookings =
    bookings.length;

  const upcomingBookings =
    bookings.filter(
      (b) =>
        b.status === "Approved"
    ).length;

  return (
    <>
    <Nav />
    <div id="page-user-dash" className="active">

      {/* SIDEBAR */}
      <div className="dash-sidebar">

        <div
          className={`dash-nav-item ${
            activePage === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActivePage("dashboard")}
        >
          <span className="dash-nav-icon">📊</span>
          Dashboard
        </div>

        <div
          className="dash-nav-item"
          onClick={() => window.location.href = "/reserve"}
        >
          <span className="dash-nav-icon">📅</span>
          Reservation
        </div>

        <div
          className={`dash-nav-item ${
            activePage === "bookings" ? "active" : ""
          }`}
          onClick={() => setActivePage("bookings")}
        >
          <span className="dash-nav-icon">📜</span>
          My Bookings
        </div>

        <div
          className={`dash-nav-item ${
            activePage === "policy" ? "active" : ""
          }`}
          onClick={() => setActivePage("policy")}
        >
          <span className="dash-nav-icon">📋</span>
          Policy
        </div>

        <div
          className="dash-nav-item"
          style={{
            marginTop: "auto",
            position: "absolute",
            bottom: "20px",
            width: "220px"
          }}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          <span className="dash-nav-icon">🚪</span>
          Logout
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="dash-main">

        {/* DASHBOARD */}
        {activePage === "dashboard" && (

          <div className="dash-page active">

            <div className="user-welcome">

              <div className="user-avatar">
                {initials}
              </div>

              <div>
                <div className="user-name">
                  {user?.fullname}
                </div>

                <div className="user-email">
                  {user?.email}
                </div>
              </div>

              <div className="user-status">
                Active Member
              </div>

            </div>

            <div className="dash-header">

              <h1>
                Welcome back,{" "}
                <em className="gold">
                  {user?.fullname?.split(" ")[0]}
                </em>
              </h1>

              <p>
                Here's a summary of your reservations and updates.
              </p>

            </div>

            <div
              className="stats-grid"
              style={{
                gridTemplateColumns: "1fr 1fr"
              }}
            >

              <div className="stat-card">
                <div className="stat-num">
                  {totalBookings}
                </div>
                <div className="stat-label">
                  Total Bookings
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-num">
                  {upcomingBookings}
                </div>
                <div className="stat-label">
                  Upcoming
                </div>
              </div>

            </div>

            <div className="dash-table-wrap">

              <div className="dash-table-head">
                <h3>Upcoming Reservations</h3>
              </div>

              <table>

                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id}>
                      <td>
                        {b.reservation_type}
                      </td>
                      <td>
                        {b.reservation_date}
                      </td>
                      <td>
                        {b.reservation_time}
                      </td>
                      <td>
                        {b.guest_count}
                      </td>
                      <td>
                        <span
                          className={`badge badge-${b.status.toLowerCase()}`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              style={{
                display: "flex",
                gap: "16px"
              }}
            >
              <button
                className="btn-primary"
                onClick={() => window.location.href = "/reserve"}
              >
                New Reservation
              </button>

              <button
                className="btn-outline"
                onClick={() => setActivePage("bookings")}
              >
                View All Bookings
              </button>

            </div>

          </div>

        )}

        {selectedBooking && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>
                Reservation Details
              </h2>
              <p>
                <strong>ID:</strong>
                {" "}
                #{selectedBooking.id}
              </p>
              <p>
                <strong>Type:</strong>
                {" "}
                {selectedBooking.reservation_type}
              </p>
              <p>
                <strong>Date:</strong>
                {" "}
                {selectedBooking.reservation_date}
              </p>
              <p>
                <strong>Time:</strong>
                {selectedBooking.reservation_time}
              </p>
              <p>
                <strong>Guests:</strong>
                {" "}
                {selectedBooking.guest_count}
              </p>
              <p>
                <strong>Special Request:</strong>
                {selectedBooking.special_request || " None"}
              </p>
              <p>
                <strong>Status:</strong>
                {" "}
                {selectedBooking.status}
              </p>
              <button
                className="btn-primary"
                onClick={() =>
                  setSelectedBooking(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* MY BOOKINGS */}
        {activePage === "bookings" && (
          <MyBookings
            bookings={bookings}
            viewBooking={viewBooking}
            cancelBooking={cancelBooking}
          />
        )}

        {/* POLICY */}
        {activePage === "policy" && (
          <div className="dash-page active">
            <div className="dash-header">
              <h1>
                Reservation{" "}
                <span className="gold">
                  Policy
                </span>
              </h1>
            </div>
            <div
              style={{
                background: "var(--navy-mid)",
                padding: "40px",
                maxWidth: "720px"
              }}
            >
              <div style={{ marginBottom: "28px" }}>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue'",
                    letterSpacing: "3px",
                    color: "var(--gold)",
                    fontSize: "14px",
                    marginBottom: "12px"
                  }}
                >
                  Cancellation Policy
                </h3>
                <p
                  style={{
                    color: "var(--gray-light)",
                    lineHeight: "1.8"
                  }}
                >
                  Cancellations must be made
                  at least 24 hours before
                  the reservation time.
                  Late cancellations may
                  be subject to a cancellation
                  fee equivalent to 50% of
                  the estimated spend.
                </p>
              </div>
              <div style={{ marginBottom: "28px" }}>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue'",
                    letterSpacing: "3px",
                    color: "var(--gold)",
                    fontSize: "14px",
                    marginBottom: "12px"
                  }}
                >
                  Late Arrival
                </h3>
                <p
                  style={{
                    color: "var(--gray-light)",
                    lineHeight: "1.8"
                  }}
                >
                  Your table will be held
                  for 30 minutes past the
                  reservation time. After
                  that, the slot may be
                  released to walk-in guests.
                </p>
              </div>
              <div style={{ marginBottom: "28px" }}>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue'",
                    letterSpacing: "3px",
                    color: "var(--gold)",
                    fontSize: "14px",
                    marginBottom: "12px"
                  }}
                >
                  No-Show Policy
                </h3>
                <p
                  style={{
                    color: "var(--gray-light)",
                    lineHeight: "1.8"
                  }}
                >
                  No-shows without prior
                  notice will result in
                  a temporary suspension
                  of reservation privileges
                  for 30 days.
                </p>

              </div>
              <div style={{ marginBottom: "28px" }}>

                <h3
                  style={{
                    fontFamily: "'Bebas Neue'",
                    letterSpacing: "3px",
                    color: "var(--gold)",
                    fontSize: "14px",
                    marginBottom: "12px"
                  }}
                >
                  Venue Rules
                </h3>
                <p
                  style={{
                    color: "var(--gray-light)",
                    lineHeight: "1.8"
                  }}
                >
                  Ivory Lounge & Bar
                  operates a strict dress
                  code and behavior policy.
                  Management reserves the
                  right to refuse entry.
                  No outside food or beverages.
                  Minimum age for entry is 18.
                </p>
              </div>
              <div
                class="policy-check"
              >
                <input
                  type="checkbox"
                  id="policy-check"
                />
                <label htmlFor="policy-check">
                  I have read and agree
                  to the Ivory Lounge &
                  Bar Reservation Policy
                  and Venue Rules.
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

function MyBookings({
  bookings,
  viewBooking,
  cancelBooking
}) {

  return (

    <div>

      <div className="dash-header">

        <h1>
          My{" "}
          <span className="gold">
            Bookings
          </span>
        </h1>

        <p>
          All your reservations
          at Ivory.
        </p>

      </div>

      <div className="dash-table-wrap">

        <div className="dash-table-head">
          <h3>
            Booking History
          </h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>
                  #{b.id}
                </td>
                <td>
                  {b.reservation_type}
                </td>
                <td>
                  {b.reservation_date}
                </td>
                <td>
                  {b.guest_count}
                </td>
                <td>
                  <span
                    className={`badge badge-${b.status.toLowerCase()}`}
                  >
                    {b.status}
                  </span>

                </td>
                <td>
                  <div className="action-btns">
                    <button
                      className="action-btn action-btn-edit"
                      onClick={() => viewBooking(b)}
                    >
                      View
                    </button>
                    {b.status !== "Cancelled" && (
                      <button
                        className="action-btn action-btn-delete"
                        onClick={() =>
                          cancelBooking(b.id)
                        }
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}