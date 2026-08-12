import { steps } from '../data/content'
import { Reveal } from './Reveal'

export function Process() {
  return (
    <section className="section" id="processo">
      <div className="container">
        <Reveal className="section-head section-head--split">
          <div>
            <span className="eyebrow">Processo</span>
            <h2 className="section-title">Quatro etapas, zero mistério</h2>
          </div>
          <p className="section-lead">
            Você sempre sabe em que ponto o projeto está, o que vem depois e por que aquela decisão
            foi tomada. Nada de caixa-preta criativa.
          </p>
        </Reveal>

        <ol className="process__list">
          {steps.map((step, i) => (
            <Reveal as="li" className="step" key={step.num} delay={i * 80}>
              <span className="step__num">{step.num}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__text">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
