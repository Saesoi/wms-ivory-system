import "../../components/hero.css";
import Hero from "../../components/hero";

export default function LandingHero() {
  return(
    <div className='hero'>
      <Hero 
        eyebrow="— EST. 2024 · QUEZON CITY" 
        title={
          <>  
           Where Every <br /><span className='gold'>Night</span>  <br /> Becomes a <br /> Memory
          </>
        } 
        description={
          <>
            Ivory Lounge & Bar — where cocktails meet <br /> competition, and luxury meets leisure.
          </>
        }
      />
      <div className='buttons-hero'>
        <button>RESERVE NOW</button>
        <button>BOOK AN EVENT</button>
      </div>
    </div>
  )
}