import './hero.css'

export default function Hero({eyebrow, title, description, className=""}) {
  return(
    <div className={className}>
      {eyebrow && <p className='title-eyebrow gold'>{eyebrow}</p>}
      {title && <h1 className='title-hero'>{title}</h1>}
      {description && <p className='gray title-desc'>{description}</p>}
    </div>
  )
}