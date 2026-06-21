import Hero from "../../components/hero.jsx"
import "./offer.css"
import cocktail from "../../assets/cocktails.png"
import music from "../../assets/dj.png"
import crown from "../../assets/crown.png"
import popper from "../../assets/party-popper.png"

export default function Offer() {
  return(
    <section className="offer-section">
      <div className="offer-left">
        <Hero 
          className="history-hero"
          eyebrow="— WHAT WE OFFER —"
          title={
          <>
            The <span className="gold">Ivory</ span> Experience.
          </>}
        />
      </div>
      <div className="offer-right">
        <div>
          <img src={cocktail} alt="" />
          <h4>COCKTAILS</h4>
          <p>Signature and classic cocktails crafted by our expert mixologists. Every sip, perfected.</p>
        </div>
        <div>
          <img src={music} alt="" />
          <h4>MUSIC / DJ</h4>
          <p>Live DJ sets and curated playlists to set the perfect mood every night of the week.</p>
        </div>
        <div>
          <img src={crown} alt="" />
          <h4>VIP LOUNGE</h4>
          <p>Exclusive VIP areas for those who want privacy, premium service, and luxury seating.</p>
        </div>
        <div>
          <img src={popper} alt="" />
          <h4>PRIVATE EVENTS</h4>
          <p>Birthdays, corporate nights, and private gatherings — we make every occasion unforgettable.</p>
        </div>
      </div>
    </section>
  )
}