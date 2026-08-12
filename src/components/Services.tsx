import { services } from '../data/content'
import { Reveal } from './Reveal'

export function Services() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <Reveal className="section-head section-head--split">
          <div>
            <span className="eyebrow">Serviços</span>
            <h2 className="section-title">Tudo que a sua marca precisa, sob um mesmo teto</h2>
          </div>
          <p className="section-lead">
            Você não precisa costurar cinco fornecedores. Estratégia, criação e mídia trabalham
            juntas — e é isso que faz o resultado aparecer mais rápido.
          </p>
        </Reveal>

        <div className="services__grid">
          {services.map((service, i) => (
            <Reveal as="article" className="service-card" key={service.num} delay={i * 70}>
              <span className="service-card__num">{service.num}</span>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__text">{service.text}</p>
              <ul className="service-card__tags">
                {service.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
