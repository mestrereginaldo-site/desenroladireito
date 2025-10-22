import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: 800, margin: '0 auto' }}>
      <h1>Desenrola Direito</h1>
      <p>Direito descomplicado para quem precisa receber.</p>

      <nav style={{ marginTop: '2rem' }}>
        <h2>Ferramentas gratuitas</h2>
        <ul>
          <li>
            <Link href="/calculadora/morte-acidente-trabalho">
              <a>▶ Calculadora – Indenização por morte em acidente de trabalho</a>
            </Link>
          </li>
        </ul>
      </nav>

      <p style={{ marginTop: '2rem' }}>Mais calculadoras em breve!</p>
    </main>
  )
}
