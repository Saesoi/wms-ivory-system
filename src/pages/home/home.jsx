import Nav from '../../components/nav'
import LandingHero from './landingHero'
import ReservationForm from '../../components/reservationForm'
import History from './history'
import Offer from './offer'
import Announcement from './announcement'
import Gallery from "./gallery"
import Footer from "../../components/footer"

export default function Home() {
  return(
    <>
      <Nav />
      <LandingHero />
      <ReservationForm />
      <History />
      <Offer />
      <Announcement />
      <Gallery />
      <Footer />
    </>
   
  )
}