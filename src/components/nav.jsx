import './nav.css'

export default function Nav() {
  return(
    <>  
      <nav className="nav">
        <div className='nav-left'>
          <img className='logo' src="/src/assets/ivory-logo.jpg" alt="WMS Ivory Logo" />
          <div>
            <h3 className='gold nav-title'>IVORY</h3>
            <p className='gray small-text'>Lounge & Bar</p>
          </div>
        </div>
        <div className='nav-right'>
          <img className='hamburger' src="/src/assets/hamburger.png" alt="Hamburger Menu" />
        </div>
      </nav>
    </>
  )
}