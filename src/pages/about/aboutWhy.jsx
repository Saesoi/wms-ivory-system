import Hero from "../../components/hero"
import './aboutWhy.css'

export default function AboutWhy() {
  return(
    <section className="why-section">
      <div>
        <Hero className="why-hero" 
        eyebrow="— WHY CHOOSE US"
        title={
          <>
          The <span className="gold">Ivory</span> Difference
          </>
        }
        />          
      </div>
      <div className="why-cards">
        <Hero className="why-card"
        eyebrow="01"
        title="Luxury Experience"
        description="From tournament-grade Star Billiards tables to designer interiors, every element is chosen for quality and atmosphere."
        />

        <Hero className="why-card"
        eyebrow="02"
        title="Exclusive Bookings"
        description="Private table reservations, occasion bookings, and full venue takeovers — all managed seamlessly through our platform."
        />

        <Hero className="why-card"
        eyebrow="03"
        title="Premium Service"
        description="Attentive staff, expert bartenders, and a hospitality philosophy that puts your experience above all else."
        />
      </div>
    </section>
  )
}