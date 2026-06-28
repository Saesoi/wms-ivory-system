import './reservationForm.css';
import { useState } from "react";

export default function ReservationForm() {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [time, setTime] = useState("");

  const checkAvailability = async () => {

    if (!date || !guests || !time) {
      alert(
        "Please select date, guests and time."
      );
      return;
    }

    try {

      const response = await fetch(
        `/api/check_capacity.php?date=${date}`
      );

      const data =
        await response.json();

      if (!data) {

        window.location.href =
          `/reserve?date=${date}&guests=${guests}&time=${time}`;

        return;
      }

      if (
        data.full_venue_limit ===
        "Blocked"
      ) {

        alert(
          "Sorry, this date is unavailable."
        );

        return;
      }

      window.location.href =
        `/reserve?date=${date}&guests=${guests}&time=${time}`;

    } catch(error) {

      console.error(error);

    }

  };
  return (
    <div className="reservation-form">
      <h4 className="reservation-title gold">QUICK RESERVATION</h4>

      <div className="reser-parent">

        <div className="div1 field">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />
        </div>

        <div className="div2 field">
          <label htmlFor="guest">Guests</label>
          <select
            value={guests}
            onChange={(e) =>
              setGuests(e.target.value)
            }
          >
            <option value="">
              Select Guests
            </option>

            <option value="1">1-2</option>
            <option value="2">3-5</option>
            <option value="3">6-10</option>
            <option value="4">11+</option>
          </select>
        </div>

        <div className="div3 field">
          <label htmlFor="time">Time</label>
          <select
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
          >
            <option value="">
              Select Time
            </option>

            <option value="0">5:00 PM</option>
            <option value="1">6:00 PM</option>
            <option value="2">7:00 PM</option>
            <option value="3">8:00 PM</option>
            <option value="4">9:00 PM</option>
            <option value="5">10:00 PM</option>
          </select>
        </div>

        <div className="div4">
          <button
            onClick={checkAvailability}
          >
            CHECK AVAILABILITY
          </button>
        </div>

      </div>
    </div>
  );
}