import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./reserveForm.css";

export default function Reservation() {
  const [activeTab, setActiveTab] = useState("table");
  const [paymentProof, setPaymentProof] = useState(null);

  const [searchParams] =
  useSearchParams();

  const dateParam =
    searchParams.get("date");

  const guestsParam =
    searchParams.get("guests");

  const timeParam =
    searchParams.get("time");

  const [reservation, setReservation] = useState({
    date:
      dateParam || "2026-06-20",

    time:
      timeParam === "0"
        ? "5:00 PM"
        : timeParam === "1"
        ? "6:00 PM"
        : timeParam === "2"
        ? "7:00 PM"
        : timeParam === "3"
        ? "8:00 PM"
        : timeParam === "4"
        ? "9:00 PM"
        : timeParam === "5"
        ? "10:00 PM"
        : "5:00 PM",

    guests:
      guestsParam === "1"
        ? "1-2 guests"
        : guestsParam === "2"
        ? "3-4 guests"
        : guestsParam === "3"
        ? "5-6 guests"
        : guestsParam === "4"
        ? "7+ guests"
        : "1-2 guests",

    table: "No preference",
    agree: false
  });

  const [occasion, setOccasion] = useState({
    type: "Birthday",
    date: "2026-06-20",
    time: "5:00 PM",
    guests: "1-2 guests",
    description: "",
    request: "",
  });

  const [venue, setVenue] = useState({
    date: "2026-06-20",
    guests: "20 persons",
    description: "",
  });

  const handleReservationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReservation({
      ...reservation,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleOccasionChange = (e) => {
    const { name, value } = e.target;
    setOccasion({ ...occasion, [name]: value });
  };

  const handleVenueChange = (e) => {
    const { name, value } = e.target;
    setVenue({ ...venue, [name]: value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const submitReservation = async (payload) => {
  console.log("Submitting reservation...");
  console.log(payload);
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    alert("Please login first");
    return;
  }

  if (!paymentProof) {
    alert("Please upload your proof of payment.");
    return;
  }

  try {

    const formData = new FormData();

    // User data
    formData.append("user_id", user.id);
    formData.append("status", "Pending");

    // Reservation details
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    // Uploaded payment proof
    formData.append("payment_proof", paymentProof);

    const response = await fetch(
      "/api/create_reservation.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("Server response:", data);

    alert(data.message);

  } catch (err) {

    console.error(err);
    alert("Error creating reservation");

  }
};

  return (
    <section className="reservation-container">

      {/* LEFT */}
      <div className="reservation-form">

        {/* TABS */}
        <div className="tabs">
          <button
            className={activeTab === "table" ? "active" : ""}
            onClick={() => setActiveTab("table")}
          >
            Table Reservation
          </button>

          <button
            className={activeTab === "occasion" ? "active" : ""}
            onClick={() => setActiveTab("occasion")}
          >
            Occasion Booking
          </button>

          <button
            className={activeTab === "venue" ? "active" : ""}
            onClick={() => setActiveTab("venue")}
          >
            Full Venue
          </button>
        </div>

        {/* TABLE RESERVATION */}
        {activeTab === "table" && (
          <>
            <div className="field">
              <label>DATE</label>
              <input type="date" name="date" value={reservation.date} onChange={handleReservationChange} />
            </div>

            <div className="field">
              <label>TIME</label>
              <select name="time" value={reservation.time} onChange={handleReservationChange}>
                <option>5:00 PM</option>
                <option>6:00 PM</option>
                <option>7:00 PM</option>
                <option>8:00 PM</option>
              </select>
            </div>

            <div className="field">
              <label>NUMBER OF GUESTS</label>
              <select name="guests" value={reservation.guests} onChange={handleReservationChange}>
                <option>1-2 guests</option>
                <option>3-4 guests</option>
                <option>5-6 guests</option>
                <option>7+ guests</option>
              </select>
            </div>

            <div className="field">
              <label>TABLE PREFERENCE</label>
              <select name="table" value={reservation.table} onChange={handleReservationChange}>
                <option>No preference</option>
                <option>Window Seat</option>
                <option>VIP Area</option>
                <option>Outdoor</option>
              </select>
            </div>

            <div className="field">
              <label>PROOF OF DOWNPAYMENT (MINIMUM ₱1,000)</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPaymentProof(e.target.files[0])
                }
              />

              <small className="upload-note">
                Upload your GCash, Maya, Bank Transfer, or other payment receipt.
              </small>
            </div>

            <div className="terms">
              <input type="checkbox" name="agree" checked={reservation.agree} onChange={handleReservationChange} />
              <p>I agree to the terms.</p>
            </div>

            <button
              className="confirm-btn"
              onClick={() =>
                submitReservation({
                  reservation_type: "table",
                  reservation_date: reservation.date,
                  reservation_time: reservation.time,
                  guest_count: reservation.guests,
                  table_preference: reservation.table,
                  occasion_type: "",
                  event_description: "",
                  special_requests: ""
                })
              }
            >
              CONFIRM RESERVATION
            </button>
          </>
        )}

        {/* OCCASION BOOKING */}
        {activeTab === "occasion" && (
          <>
            <div className="field">
              <label>EVENT TYPE</label>
              <div className="event-type">
                <button onClick={() => setOccasion({ ...occasion, type: "Birthday" })}>Birthday</button>
                <button onClick={() => setOccasion({ ...occasion, type: "Wedding" })}>Wedding</button>
                <button onClick={() => setOccasion({ ...occasion, type: "Private Gathering" })}>
                  Private Gathering
                </button>
              </div>
            </div>

            <div className="field">
              <label>DATE</label>
              <input type="date" name="date" value={occasion.date} onChange={handleOccasionChange} />
            </div>

            <div className="field">
              <label>TIME</label>
              <select name="time" value={occasion.time} onChange={handleOccasionChange}>
                <option>5:00 PM</option>
                <option>6:00 PM</option>
                <option>7:00 PM</option>
              </select>
            </div>

            <div className="field">
              <label>GUESTS</label>
              <select name="guests" value={occasion.guests} onChange={handleOccasionChange}>
                <option>1-2 guests</option>
                <option>3-10 guests</option>
                <option>10-30 guests</option>
                <option>30+ guests</option>
              </select>
            </div>

            <div className="field">
              <label>EVENT DESCRIPTION</label>
              <textarea name="description" value={occasion.description} onChange={handleOccasionChange} />
            </div>

            <div className="field">
              <label>SPECIAL REQUEST</label>
              <textarea name="request" value={occasion.request} onChange={handleOccasionChange} />
            </div>

            <div className="field">
              <label>PROOF OF DOWNPAYMENT (MINIMUM ₱1,000)</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPaymentProof(e.target.files[0])
                }
              />

              <small className="upload-note">
                Upload your GCash, Maya, Bank Transfer, or other payment receipt.
              </small>
            </div>

            <button
              className="confirm-btn"
              onClick={() =>
                submitReservation({
                  reservation_type: "occasion",
                  reservation_date: occasion.date,
                  reservation_time: occasion.time,
                  guest_count: occasion.guests,
                  table_preference: "",
                  occasion_type: occasion.type,
                  event_description: occasion.description,
                  special_requests: occasion.request
                })
              }
            >
              CONFIRM EVENT
            </button>
          </>
        )}

        {/* FULL VENUE */}
        {activeTab === "venue" && (
          <>
            <div className="field">
              <label>DATE</label>
              <input type="date" name="date" value={venue.date} onChange={handleVenueChange} />
            </div>

            <div className="field">
              <label>ESTIMATED GUESTS</label>
              <select name="guests" value={venue.guests} onChange={handleVenueChange}>
                <option>20 persons</option>
                <option>50 persons</option>
                <option>100 persons</option>
                <option>200+ persons</option>
              </select>
            </div>

            <div className="field">
              <label>EVENT PURPOSE / DESCRIPTION</label>
              <textarea name="description" value={venue.description} onChange={handleVenueChange} />
            </div>

            <div className="field">
              <label>PROOF OF DOWNPAYMENT (MINIMUM ₱1,000)</label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPaymentProof(e.target.files[0])
                }
              />

              <small className="upload-note">
                Upload your GCash, Maya, Bank Transfer, or other payment receipt.
              </small>
            </div>
            
            <button
              className="confirm-btn"
              onClick={() =>
                submitReservation({
                  reservation_type: "venue",
                  reservation_date: venue.date,
                  reservation_time: "",
                  guest_count: venue.guests,
                  table_preference: "",
                  occasion_type: "",
                  event_description: venue.description,
                  special_requests: ""
                })
              }
            >
              REQUEST VENUE
            </button>
          </>
        )}
      </div>

      {/* RIGHT SUMMARY */}
      <div className="reservation-summary">

        {activeTab === "table" && (
          <>
            <h3>RESERVATION SUMMARY</h3>
            <div className="summary-row"><span>Date</span><strong>{formatDate(reservation.date)}</strong></div>
            <div className="summary-row"><span>Time</span><strong>{reservation.time}</strong></div>
            <div className="summary-row"><span>Guests</span><strong>{reservation.guests}</strong></div>
          </>
        )}

        {activeTab === "occasion" && (
          <>
            <h3>EVENT SUMMARY</h3>
            <div className="summary-row"><span>Type</span><strong>{occasion.type}</strong></div>
            <div className="summary-row"><span>Date</span><strong>{formatDate(occasion.date)}</strong></div>
            <div className="summary-row"><span>Time</span><strong>{occasion.time}</strong></div>
            <div className="summary-row"><span>Guests</span><strong>{occasion.guests}</strong></div>
          </>
        )}

        {activeTab === "venue" && (
          <>
            <h3>VENUE SUMMARY</h3>
            <div className="summary-row"><span>Date</span><strong>{formatDate(venue.date)}</strong></div>
            <div className="summary-row"><span>Guests</span><strong>{venue.guests}</strong></div>
          </>
        )}

        <div className="divider"></div>
        <p className="summary-note">
          Your request will be reviewed by our team.
        </p>
      </div>

    </section>
  );
}