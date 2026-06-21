import Hero from "../../components/hero"
import './eventsHero.css'

export default function EventsHero(){
  return(
    <section className="about-hero">
      <div className="about-left">
        <Hero 
        className="hero-about"
        eyebrow="— Upcoming Events "
        title={
          <>  
            What's <span className='gold'>On</span> 
          </>
        } 
        description={
          <>
           Parties, DJ nights, tournaments, and special promos — happening at Ivory.
          </>
        }
        />
      </div>
      <div className="about-right">
        <h1>EVENTS</h1>
      </div>
    </section>
  )
}