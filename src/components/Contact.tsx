import { useState, type ChangeEvent, type FormEvent } from 'react'
import { site } from '../data/content'
import { ArrowRight } from './Icons'
import { Reveal } from './Reveal'

interface FormValues {
  nome: string
  email: string
  empresa: string
  mensagem: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const EMPTY: FormValues = { nome: '', email: '', empresa: '', mensagem: '' }

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (values.nome.trim().length < 2) {
    errors.nome = 'Diga como podemos te chamar.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Informe um e-mail válido.'
  }
  if (values.mensagem.trim().length < 10) {
    errors.mensagem = 'Conte um pouco mais — pelo menos 10 caracteres.'
  }

  return errors
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Limpa o erro do campo assim que a pessoa começa a corrigir.
    setErrors((prev) => (prev[name as keyof FormValues] ? { ...prev, [name]: undefined } : prev))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Sem backend: abre o cliente de e-mail com a mensagem pronta.
    // Para enviar por API, troque este bloco por um fetch para o seu endpoint.
    const subject = `Novo contato pelo site — ${values.nome}`
    const body = [
      `Nome: ${values.nome}`,
      `E-mail: ${values.email}`,
      `Empresa: ${values.empresa || '—'}`,
      '',
      values.mensagem,
    ].join('\n')

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`

    setSent(true)
    setValues(EMPTY)
  }

  const fieldClass = (name: keyof FormValues) => `field${errors[name] ? ' field--invalid' : ''}`

  return (
    <section className="section contact" id="contato">
      <div className="container contact__grid">
        <Reveal>
          <span className="eyebrow">Contato</span>
          <h2 className="contact__title">Vamos tirar seu projeto do papel</h2>
          <p className="contact__lead">
            Conte o que você precisa. Respondemos em até um dia útil com um primeiro parecer — sem
            proposta genérica e sem compromisso.
          </p>

          <ul className="contact__links">
            <li>
              <a className="contact__link" href={`mailto:${site.email}`}>
                <ArrowRight />
                {site.email}
              </a>
            </li>
            <li>
              <span className="contact__link">
                <ArrowRight />
                {site.whatsapp}
              </span>
            </li>
            <li>
              <span className="contact__link">
                <ArrowRight />
                {site.city}
              </span>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className={fieldClass('nome')}>
              <label className="field__label" htmlFor="nome">
                Nome *
              </label>
              <input
                className="field__control"
                id="nome"
                name="nome"
                value={values.nome}
                onChange={handleChange}
                placeholder="Seu nome"
                autoComplete="name"
                aria-invalid={Boolean(errors.nome)}
                aria-describedby={errors.nome ? 'erro-nome' : undefined}
              />
              {errors.nome && (
                <span className="field__error" id="erro-nome">
                  {errors.nome}
                </span>
              )}
            </div>

            <div className={fieldClass('email')}>
              <label className="field__label" htmlFor="email">
                E-mail *
              </label>
              <input
                className="field__control"
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="voce@empresa.com.br"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'erro-email' : undefined}
              />
              {errors.email && (
                <span className="field__error" id="erro-email">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="empresa">
                Empresa
              </label>
              <input
                className="field__control"
                id="empresa"
                name="empresa"
                value={values.empresa}
                onChange={handleChange}
                placeholder="Opcional"
                autoComplete="organization"
              />
            </div>

            <div className={fieldClass('mensagem')}>
              <label className="field__label" htmlFor="mensagem">
                Como podemos ajudar? *
              </label>
              <textarea
                className="field__control"
                id="mensagem"
                name="mensagem"
                value={values.mensagem}
                onChange={handleChange}
                placeholder="Fale do seu momento, do desafio e do prazo que tem em mente."
                aria-invalid={Boolean(errors.mensagem)}
                aria-describedby={errors.mensagem ? 'erro-mensagem' : undefined}
              />
              {errors.mensagem && (
                <span className="field__error" id="erro-mensagem">
                  {errors.mensagem}
                </span>
              )}
            </div>

            <button className="btn btn--lg" type="submit">
              Enviar mensagem
              <ArrowRight className="btn__arrow" />
            </button>

            {/* Região viva sempre montada, para o leitor de tela anunciar a mudança. */}
            <div role="status" aria-live="polite">
              {sent && (
                <p className="form__status">
                  Abrimos seu aplicativo de e-mail com a mensagem pronta — é só enviar.
                </p>
              )}
            </div>

            <p className="form__note">
              Ao enviar, sua mensagem é aberta no seu aplicativo de e-mail para{' '}
              {site.email}. Nenhum dado é armazenado neste site.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
