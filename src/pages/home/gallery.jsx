import Hero from "../../components/hero";
import './galerry.css'
import img1 from "../../assets/gallery1.jpg"
import img2 from "../../assets/gallery2.jpg"
import img3 from "../../assets/gallery3.jpg"
import img4 from "../../assets/gallery4.jpg"
import img5 from "../../assets/gallery5.jpg"

export default function Gallery() {
  return(
    <section className="gallery-section">
      <div className="gallery-left">
        <Hero
          className="gallery-hero"
          eyebrow="— GALLERY —"
          title={
            <>
              Inside Ivory Lounge & Bar
            </>
          }
        />
      </div>
      <div className="gallery-right">
        <div className="box1">
          <img src={img1} alt="" />
        </div>
        <div>
          <img src={img2}alt="" />
        </div>
        <div>
          <img src={img3} alt="" />
        </div>
        <div>
          <img src={img5} alt="" />
        </div>
        <div>
          <img src={img4} alt="" />
        </div>
      </div>
    </section>
  )
}