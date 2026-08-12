import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { Stats } from './components/Stats'
import { Testimonials } from './components/Testimonials'
import { Work } from './components/Work'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Marquee />
        <Services />
        <Stats />
        <Process />
        <Work />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
