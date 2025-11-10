import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <h1>🏛️ Desenrola Direito</h1>
          <p>Simplificando o Direito para Você</p>
        </Link>
        
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>Início</Link>
          <Link to="/artigos" style={styles.navLink}>Artigos</Link>
          <Link to="/consultoria" style={styles.navLink}>Consultoria</Link>
          <Link to="/contato" style={styles.navLink}>Contato</Link>
        </nav>
      </div>
    </header>
  )
}

const styles = {
  header: {
    background: '#2c3e50',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  logo: {
    textDecoration: 'none',
    color: 'white'
  },
  nav: {
    display: 'flex',
    gap: '2rem'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s'
  }
}

export default Header
