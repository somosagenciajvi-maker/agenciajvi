import { cases } from '../data/content'
import { CasePoster } from './CasePoster'
import { Reveal } from './Reveal'

export function Work() {
  return (
    <section className="section section--line" id="cases">
      <div className="container">
        <Reveal className="section-head section-head--split">
          <div>
            <span className="eyebrow">Cases</span>
            <h2 className="section-title">Trabalho que virou resultado</h2>
          </div>
          <p className="section-lead">
            Uma amostra do que entregamos nos últimos meses — cada projeto com um problema de negócio
            claro por trás.
          </p>
        </Reveal>

        <div className="work__grid">
          {cases.map((item, i) => (
            <Reveal as="article" className="case-card" key={item.title} delay={i * 80}>
              <div className="case-card__media">
                <CasePoster variant={item.variant} label={`Arte do case: ${item.title}`} />
              </div>
              <div className="case-card__body">
                <div>
                  <h3 className="case-card__title">{item.title}</h3>
                  <p className="case-card__text">{item.text}</p>
                </div>
                <span className="case-card__tag">{item.tag}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
