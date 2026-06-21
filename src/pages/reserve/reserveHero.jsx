import Hero from "../../components/hero"
import './reserveHero.css'

export default function ReserveHero(){
  return(
    <section className="about-hero">
      <div className="about-left">
        <Hero 
        className="hero-about"
        eyebrow="— Reservations "
        title={
          <>  
            Book Your  <span className='gold'>Table</span> 
          </>
        } 
        description={
          <>
            Choose your reservation type below. All bookings are subject to admin approval and venue availability.
          </>
        }
        />
      </div>
      <div className="about-right">
        <h1>BOOK</h1>
      </div>
    </section>
  )
}