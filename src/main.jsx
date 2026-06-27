import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import "leaflet/dist/leaflet.css"

import Home from './pages/home/home'
import About from './pages/about/about'
import Reserve from './pages/reserve/reserve'
import Events from './pages/events/events'
import Contact from './pages/contact/contacts'
import Auth from './components/login'
import Profile from "./pages/profile/Profile";
import Admin from "./pages/admin/Admin";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/reserve' element={<Reserve/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
