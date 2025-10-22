import Link from 'next/link'

export default function Home() {
  return (
    <>
      <header>
        <div className="container">
          <h1>Desenrola Direito</h1>
          <nav>
            <Link href="/calculadora/morte-acidente-trabalho">Calculadoras</Link>
            <Link href="/#modelos">Modelos</Link>
            <Link href="/#contato">Contato</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <h2>Direito descomplicado para quem precisa receber.</h2>
        <p>Ferramentas gratuitas, modelos de petição e passo a passo para você receber sua indenização sem drama.</p>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/calculadora/morte-acidente-trabalho">
            <a className="btn">▶ Calculadora – Morte acidente de trabalho</a>
          </Link>
        </div>
      </main>

      <footer>
        © 2025 Desenrola Direito – Todos os direitos reservados.
      </footer>
    </>
  )
}
