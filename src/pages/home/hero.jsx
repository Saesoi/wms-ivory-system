import './hero.css'

export default function Hero() {
  return(
    <div className='hero'>
      <div>
        <p className='top-hero gold'>— EST. 2024 · QUEZON CITY</p>
        <h1 className='title-hero'>Where Every <br /><span className='gold'>Night</span>  <br /> Becomes a <br /> Memory</h1>
        <p className='gray desc-hero'>Ivory Lounge & Bar — where cocktails meet <br /> competition, and luxury meets leisure.</p>
      </div>
      <div className='buttons-hero'>
        <button>RESERVE NOW</button>
        <button>BOOK AN EVENT</button>
      </div>
    </div>
  )
}