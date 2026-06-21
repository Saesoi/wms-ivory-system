import Hero from "../../components/hero"
import './contactHero.css'

export default function EventsHero(){
  return(
    <section className="about-hero">
      <div className="about-left">
        <Hero 
        className="hero-about"
        eyebrow="— Get in Touch "
        title={
          <>  
            Contact <span className='gold'>Us</span> 
          </>
        } 
        description={
          <>
           Have questions? Want to visit? We'd love to hear from you.
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