import Hero from "../../components/hero.jsx"
import './announcement.css'

export default function Announcement() {
  return(
    <section className="announcement-section">
      <div className="left-div">
        <Hero 
          className="announcement-hero"
          eyebrow="— Latest Updates —"
          title="Announcements"       
        />
      </div>
      <div className="right-div">
        <div className="div">
          <Hero 
            className="right-hero"
            eyebrow="May 17, 2026"
            title="Friday Night DJ: DJ Krave"     
            description="This Friday, experience the sound of DJ Krave live on the decks. Doors open at 8 PM. Limited slots available."  
          />
        </div>
        <div className="div">
          <Hero 
            className="right-hero"
            eyebrow="May 17, 2026"
            title="Birthday Promo: Get 1 Table Free"     
            description="Celebrate your birthday at Ivory! Book an occasion reservation and get one billiards table for free. Valid for groups of 5+."  
          />
        </div>
        <div className="div">
          <Hero 
            className="right-hero"
            eyebrow="May 20, 2026"
            title="Grand Reopening: New VIP Section"     
            description="We're expanding! Our new VIP wing with 4 private tables and a dedicated bar opens June 1. Reserve early."  
          />
        </div>
      </div>
    </section>
  )
}