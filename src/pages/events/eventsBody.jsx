import { Link } from "react-router-dom";
import "./eventsBody.css";

const events = [
  {
    icon: "🎧",
    tag: "DJ NIGHT",
    title: "DJ Krave: Friday Night Live",
    date: "Friday, May 23, 2026 • 9:00 PM",
    description:
      "The city's hottest DJ takes the decks for a night of house, R&B, and afrobeats. Cocktail specials all night.",
    button: "RESERVE FOR THIS EVENT",
  },
  {
    icon: "🎱",
    tag: "TOURNAMENT",
    title: "Ivory 8-Ball Open",
    date: "Saturday, May 31, 2026 • 2:00 PM",
    description:
      "Open billiards tournament with ₱10,000 prize pool. Registration open to all skill levels.",
    button: "RESERVE A SLOT",
  },
  {
    icon: "🥂",
    tag: "SPECIAL PROMO",
    title: "Ladies' Night: Free Welcome Drink",
    date: "Every Wednesday • 5:00 PM - 8:00 PM",
    description:
      "Every Wednesday, ladies enjoy a complimentary welcome cocktail and special discounts.",
    button: "RESERVE NOW",
  },
  {
    icon: "🎂",
    tag: "BIRTHDAY PACKAGE",
    title: "Celebrate at Ivory",
    date: "Available All Month",
    description:
      "Birthday packages include table hours, party setup, and complimentary drinks.",
    button: "BOOK A BIRTHDAY",
  },
  {
    icon: "🏛️",
    tag: "CORPORATE",
    title: "Corporate Night Out",
    date: "Book Any Date",
    description:
      "Perfect for team building, client entertainment, and company celebrations.",
    button: "INQUIRE NOW",
  },
  {
    icon: "✨",
    tag: "VIP OPENING",
    title: "New VIP Section Launch",
    date: "June 1, 2026 • 7:00 PM",
    description:
      "Be the first to experience our new VIP wing. Limited invitations available.",
    button: "RSVP NOW",
  },
];

export default function Events() {
  return (
    <section className="events">
      <div className="events__grid">
        {events.map((event, index) => (
          <article className="event-card" key={index}>
            <div className="event-card__top">
              <span className="event-card__icon">{event.icon}</span>
            </div>

            <div className="event-card__content">
              <span className="event-card__tag">{event.tag}</span>

              <h3>{event.title}</h3>

              <p className="event-card__date">{event.date}</p>

              <p className="event-card__description">
                {event.description}
              </p>

              <Link
                to="/reserve"
                className="event-card__button"
              >
                {event.button}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}