import Link from 'next/link'
import CalculadoraMorte from '../components/CalculadoraMorte'

export default function Home() {
  return (
    <>
      {/* HEADER/HERO EXATO DO ANTIGO */}
      <section className="header-hero">
        <h1>Desenrola Direito</h1>
        <p>Direito descomplicado para quem precisa receber.</p>
        <Link href="#calc">
          <a className="cta-button">Comece agora</a>
        </Link>
      </section>

      {/* CONTEÚDO */}
      <main className="container">
        <h2>Ferramentas gratuitas</h2>
        <p>Calculadoras e modelos para você receber sua indenização sem drama.</p>

        {/* CALCULADORA */}
        <div id="calc" className="calc-card">
          <h2>Calculadora – Indenização por morte acidente trabalho</h2>
          <CalculadoraMorte />
        </div>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <h4>Desenrola Direito</h4>
            <p>Advocacia moderna, resultados sem complicação.</p>
            <p>OAB/SC 99.999 | Dr. Reginaldo Oliveira</p>
          </div>
          <div>
            <h4>Ferramentas</h4>
            <ul>
              <li><a href="/calculadora/morte-acidente-trabalho">Calculadora Acidente</a></li>
              <li><a href="/calculadora/fgts">Calculadora FGTS</a></li>
            </ul>
          </div>
          <div>
            <h4>Modelos</h4>
            <ul>
              <li><a href="/modelos/peticao-acidente-trabalho">Petição Acidente</a></li>
              <li><a href="/modelos/revisional-consorcio">Revisional Consórcio</a></li>
            </ul>
          </div>
          <div>
            <h4>Newsletter</h4>
            <p>Receba dicas jurídicas e novidades.</p>
            {/* FORMULÁRIO TALLY AQUI DEPOIS */}
          </div>
        </div>
        <div className="copy">© 2025 Desenrola Direito – Todos os direitos reservados.</div>
      </footer>
    </>
  )
}
