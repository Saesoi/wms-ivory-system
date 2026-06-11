import './reservationForm.css'

export default function ReservationForm() {
  return(
    <div className="reservation-form">
      <h4 className='reservation-title gold'>QUICK RESERVATION</h4>
      <div class="reser-parent">
        <div class="div1">
          <form action="">
            <label for="date">Date</label>
            <input type="date" id="date" name="date" required />
          </form>
        </div>
        <div class="div2">
          <form action="">
            <label for="date">Date</label>
            <input type="date" id="date" name="date" required />
          </form>
        </div>
        <div class="div3">
          <form action="">
            <label for="date">Date</label>
            <input type="date" id="date" name="date" required />
          </form>
        </div>
        <div class="div4">
          <button>CHECK AVAILABILITY</button>
        </div>
       </div>
    </div>
  )
}