import './footer.css'
import Pin from "../assets/pin.png"
import Phone from "../assets/telephone-handle-silhouette.png"
import Email from "../assets/mail.png"
import Clock from "../assets/clock.png"

export default function Footer(){
  return(
    <footer>
      <div className="footer-grid">
        <div>
          <h4 className='footer-title'>IVORY</h4>
          <p className='footer-tagline'>Lounge & Bar · Eat · Drink · Play</p>
        </div>
        <div className='footer-info'>
          <p>CONTACT INFO</p>
          <div>
            <img src={Pin} alt="" />
            <p>1 M. Almeda Street, Pasig City, Philippines 1601</p>
          </div>
          <div>
            <img src={Phone} alt="" />
            <p>+63 912 345 6789</p>
          </div>
          <div>
            <img src={Email} alt="" />
            <p>hello@ivorylounge.ph</p>
          </div>
          <div>
            <img src={Clock} alt="" />
            <p>Mon–Thu: 5PM–1AM Fri–Sun: 5PM–3AM</p>
          </div>
        </div>
        <div className='footer-media'>
          <button
                className="btn-primary"
                onClick={() => window.location.href = "/reserve"}
              >
                Reserve a Table
              </button>
          <p>FOLLOW US</p>
          <div className='social-media'>
            <a href="">f</a>
            <a href="">ig</a>
            <a href="">x</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">

      </div>
    </footer>
  )
}