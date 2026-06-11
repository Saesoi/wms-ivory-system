import './reservationForm.css';

export default function ReservationForm() {
  return (
    <div className="reservation-form">
      <h4 className="reservation-title gold">QUICK RESERVATION</h4>

      <div className="reser-parent">

        <div className="div1 field">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            required
          />
        </div>

        <div className="div2 field">
          <label htmlFor="guest">Guests</label>
          <select
            id="guest"
            name="guest"
            required
          >
            <option value="1">1-2</option>
            <option value="2">3-5</option>
            <option value="3">6-10</option>
            <option value="4">11+</option>
          </select>
        </div>

        <div className="div3 field">
          <label htmlFor="time">Time</label>
          <select
            id="time"
            name="time"
            required
          >
            <option value="0">5:00 PM</option>
            <option value="1">6:00 PM</option>
            <option value="2">7:00 PM</option>
            <option value="3">8:00 PM</option>
            <option value="4">9:00 PM</option>
            <option value="5">10:00 PM</option>
          </select>
        </div>

        <div className="div4">
          <button>CHECK AVAILABILITY</button>
        </div>

      </div>
    </div>
  );
}