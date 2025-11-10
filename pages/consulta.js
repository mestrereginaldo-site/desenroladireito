export default function Consulta() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🏛️ Consultoria Jurídica</h1>
        <p>Fale com um advogado especializado</p>
      </header>
      
      <nav style={styles.nav}>
        <a href="/">Início</a>
        <a href="/artigos">Artigos</a>
        <a href="/consulta">Consultoria</a>
      </nav>

      <main style={styles.main}>
        <h2>Consulta por Apenas R$ 29,90</h2>
        
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label>Nome completo:</label>
            <input type="text" style={styles.input} required />
          </div>
          
          <div style={styles.formGroup}>
            <label>WhatsApp:</label>
            <input type="tel" style={styles.input} placeholder="(11) 99999-9999" required />
          </div>
          
          <button type="submit" style={styles.button}>
            PAGAR R$ 29,90 E FALAR COM ADVOGADO
          </button>
        </form>
      </main>
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
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem'
  },
  form: {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  },
  button: {
    background: '#e74c3c',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%'
  }
}
