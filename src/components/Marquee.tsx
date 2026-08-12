import { marqueeItems } from '../data/content'

export function Marquee() {
  // Duas cópias da lista: a animação desloca uma faixa inteira e o loop fica contínuo.
  const track = (
    <div className="marquee__track">
      {marqueeItems.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" aria-hidden="true">
      {track}
      {track}
    </div>
  )
}
