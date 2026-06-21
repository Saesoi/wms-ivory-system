import Hero from "../../components/hero"
import './aboutHero.css'

export default function EventsHero(){
  return(
    <section className="about-hero">
      <div className="about-left">
        <Hero 
        className="hero-about"
        eyebrow="— Our Story "
        title={
          <>  
            About <span className='gold'>Ivory</span> 
          </>
        } 
        description={
          <>
           Where billiards precision meets lounge luxury — a venue crafted for those who expect more.
          </>
        }
        />
      </div>
      <div className="about-right">
        <h1>ABOUT</h1>
      </div>
    </section>
  )
}