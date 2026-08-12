import { testimonials } from '../data/content'
import { Reveal } from './Reveal'

export function Testimonials() {
  return (
    <section className="section section--line" aria-label="Depoimentos de clientes">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Depoimentos</span>
          <h2 className="section-title">O que dizem quem já trabalhou com a gente</h2>
        </Reveal>

        <div className="quotes">
          {testimonials.map((item, i) => (
            <Reveal as="article" className="quote" key={item.name} delay={i * 90}>
              <span className="quote__mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="quote__text">{item.text}</blockquote>
              <footer className="quote__author">
                <span className="quote__name">{item.name}</span>
                <span className="quote__role">{item.role}</span>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
