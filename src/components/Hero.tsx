import { heroMeta } from '../data/content'
import { ArrowDown, ArrowRight } from './Icons'
import { Reveal } from './Reveal'

export function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid-lines" aria-hidden="true" />

      <div className="container hero__inner">
        <Reveal>
          <span className="eyebrow">Agência criativa · São Paulo</span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="hero__title">
            Marcas que as pessoas <em>lembram</em>.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="hero__lead">
            Estratégia, design e performance no mesmo time. A gente constrói presença digital que
            sustenta preço, gera demanda e não depende de sorte.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="hero__actions">
            <a className="btn btn--lg" href="#contato">
              Começar um projeto
              <ArrowRight className="btn__arrow" />
            </a>
            <a className="btn btn--ghost btn--lg" href="#cases">
              Ver cases
              <ArrowDown className="btn__arrow" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="hero__meta">
            {heroMeta.map((item) => (
              <div className="hero__meta-item" key={item.label}>
                <span className="hero__meta-value">{item.value}</span>
                <span className="hero__meta-label">{item.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
