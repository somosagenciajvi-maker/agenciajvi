import { navLinks, services, site } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <a className="logo" href="#topo">
              JVI
              <span className="logo__dot" aria-hidden="true" />
            </a>
            <p className="footer__tagline">
              Agência criativa de estratégia, design e performance. Construímos marcas que as
              pessoas lembram — e que o mercado leva a sério.
            </p>
          </div>

          <div>
            <h2 className="footer__col-title">Navegação</h2>
            <ul className="footer__list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__col-title">Serviços</h2>
            <ul className="footer__list">
              {services.slice(0, 4).map((service) => (
                <li key={service.num}>
                  <a href="#servicos">{service.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {site.name}. Todos os direitos reservados.
          </span>
          <span>
            <a href={`mailto:${site.email}`}>{site.email}</a> · {site.instagram}
          </span>
        </div>
      </div>
    </footer>
  )
}
