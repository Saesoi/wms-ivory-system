import Hero from "../../components/hero" 
import './aboutBody.css'

export default function AboutBody() {
  return(
    <section className="about-body">
      <div className="about-body-who">
        <Hero 
        className="body-who-hero"
        eyebrow="— WHO ARE WE"
        description={
          <>
          Ivory Lounge & Bar is Quezon City's premier billiards lounge and entertainment venue. We bring together the precision and sport of pool with the warmth and sophistication of a luxury bar — creating an experience that's equal parts competitive and indulgent. <br /><br />
          Our Star Billiards tournament-grade tables sit beneath custom lighting rigs, surrounded by curated art, a full cocktail bar, and spaces designed for both casual play and serious competition. <br /><br />
          Whether you're here to challenge a friend, celebrate a milestone, or simply unwind with a crafted drink, Ivory is your venue.
          </>
        }
        />
      </div>
      <div className="body-mission-vision">
        <div className="vision-mission">
          <Hero className="vm" 
          eyebrow="OUR MISSION"
          description="To deliver a world-class lounge experience where every guest feels celebrated, every game matters, and every drink is crafted with intention."
          />
        </div>
        <div className="vision-mission">
          <Hero className="vm" 
          eyebrow="OUR VISION"
          description="To become the Philippines' most iconic billiards lounge — a landmark for culture, sport, nightlife, and memorable moments."
          />
        </div>
      </div>

    </section>
  )
}