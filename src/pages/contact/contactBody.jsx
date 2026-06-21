import "./contactBody.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Contact() {
  const position = [14.5734, 121.0866];

  return (
    <section className="contact">
      <div className="contact__container">

        {/* LEFT COLUMN */}
        <div className="contact__info">

          <div className="contact__heading">
            <span></span>
            <p>FIND US</p>
          </div>

          <div className="contact__item">
            <h4>ADDRESS</h4>
            <p>
              1 M. Almeda Street
              <br />
              Pasig City, Philippines 1601
            </p>
          </div>

          <div className="contact__item">
            <h4>PHONE</h4>
            <p>+63 912 345 6789</p>
          </div>

          <div className="contact__item">
            <h4>EMAIL</h4>
            <p>hello@ivorylounge.ph</p>
          </div>

          <div className="contact__item">
            <h4>OPENING HOURS</h4>
            <p>Mon – Thu: 5:00 PM – 1:00 AM</p>
            <p>Fri – Sun: 5:00 PM – 3:00 AM</p>
          </div>

          <div className="contact__socials">
            <a href="/">f</a>
            <a href="/">ig</a>
            <a href="/">tt</a>
          </div>

          <div className="contact__map">
            <MapContainer
              center={position}
              zoom={17}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={position}>
                <Popup>
                  Ivory Lounge
                  <br />
                  1 M. Almeda Street, Pasig City
                </Popup>
              </Marker>
            </MapContainer>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="contact__form-wrapper">

          <div className="contact__heading">
            <span></span>
            <p>SEND A MESSAGE</p>
          </div>

          <form className="contact__form">

            <div className="form-group">
              <label>FULL NAME</label>
              <input
                type="text"
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label>EMAIL</label>
              <input
                type="email"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>MESSAGE</label>
              <textarea
                placeholder="How can we help you?"
              />
            </div>

            <button type="submit">
              SEND MESSAGE
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}
