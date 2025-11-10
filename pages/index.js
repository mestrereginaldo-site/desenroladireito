export default function Home() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🏛️ Desenrola Direito</h1>
        <p>Consultoria Jurídica Online</p>
      </header>
      
      <nav style={styles.nav}>
        <a href="/">Início</a>
        <a href="/artigos">Artigos</a>
        <a href="/consulta">Consultoria</a>
      </nav>

      <main style={styles.main}>
        <section style={styles.hero}>
          <h2>Fale com um Advogado em 3 Minutos</h2>
          <p>Consultoria jurídica online por apenas <strong>R$ 29,90</strong></p>
          <a href="/consulta" style={styles.button}>QUERO MINHA ORIENTAÇÃO</a>
          <p>Resposta garantida em até 3 minutos</p>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>Desenrola Direito &copy; 2025</p>
      </footer>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    background: '#2c3e50',
    color: 'white',
    padding: '2rem',
    textAlign: 'center'
  },
  nav: {
    background: '#34495e',
    padding: '1rem',
    textAlign: 'center'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
    borderRadius: '10px'
  },
  button: {
    background: '#e74c3c',
    color: 'white',
    padding: '15px 30px',
    textDecoration: 'none',
    borderRadius: '5px',
    display: 'inline-block',
    margin: '10px 0',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  footer: {
    background: '#2c3e50',
    color: 'white',
    textAlign: 'center',
    padding: '2rem',
    marginTop: '3rem'
  }
}
