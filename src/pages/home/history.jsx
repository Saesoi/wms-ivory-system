import "./history.css"
import Hero from "../../components/hero"
import heroDrink from "../../assets/hero-drinks.jpg"
import heroCake from "../../assets/hero-cake.jpg"
import heroImg from "../../assets/hero-image.jpg"
import heroPlace from "../../assets/hero-place.jpg"

export default function History(){
  return(
    <section className="history-sec">
      <div className="history-left">
        <Hero
          className="history-hero"
          eyebrow="— Our Story —"
          title={
            <>  
              More Than a Bar. <br />
              It's an <span className='gold'>Experience</span> 
            </>
          } 
          description={
            <>
              Ivory Lounge & Bar fuses the precision of billiards with the elegance of a premium bar. From expertly crafted cocktails to world-class Star Billiards tables, every detail is designed to elevate your night.
            </>
          }
        />
      </div>
      <div className="history-right">
        <div className="img-parent">
          <img src={heroPlace} alt="" />
          <img src={heroDrink} alt="" />
          <img src={heroCake} alt="" />
          <img src={heroImg} alt="" />
        </div>
      </div>
    </section>
  )
}