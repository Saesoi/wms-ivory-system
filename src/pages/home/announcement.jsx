import Hero from "../../components/hero.jsx"
import "./announcement.css"
import { useEffect, useState } from "react";

export default function Announcement() {

  const [
    announcements,
    setAnnouncements
  ] = useState([]);

  useEffect(() => {
    fetch(
      "/api/get_announcements.php"
    )
      .then((res) => res.json())
      .then((data) => {

        const published =
          data.filter(
            (a) =>
              a.status === "Published"
          );

        setAnnouncements(
          published
        );
      });

  }, []);

  return(
    <section className="announcement-section">
      <div className="left-div">
        <Hero 
          className="announcement-hero"
          eyebrow="— Latest Updates —"
          title="Announcements"       
        />
      </div>
      <div className="right-div">
        {announcements.map((a) => (
        <div
          className="div"
          key={a.id}
        >

          <Hero
            className="right-hero"

            eyebrow={
              new Date(
                a.created_at
              ).toLocaleDateString()
            }

            title={a.title}

            description={
              a.content
            }
          />

        </div>

      ))}
      </div>
    </section>
  )
}