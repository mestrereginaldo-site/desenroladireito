import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>🏛️ Desenrola Direito</h3>
            <p>Simplificando o Direito para Você</p>
            <p>Consultoria jurídica online acessível e eficiente.</p>
          </div>
          
          <div style={styles.footerSection}>
            <h4 style={styles.footerSubtitle}>Links Rápidos</h4>
            <Link to="/" style={styles.footerLink}>Início</Link>
            <Link to="/artigos" style={styles.footerLink}>Artigos</Link>
            <Link to="/consultoria" style={styles.footerLink}>Consultoria</Link>
            <Link to="/contato" style={styles.footerLink}>Contato</Link>
          </div>
          
          <div style={styles.footerSection}>
            <h4 style={styles.footerSubtitle}>Contato</h4>
            <p>📧 contato@desenroladireito.com</p>
            <p>📱 (11) 99999-9999</p>
            <p>🕒 Segunda a Sexta: 9h às 18h</p>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p>&copy; 2025 Desenrola Direito. Todos os direitos reservados.</p>
          <p>CNPJ: 12.345.678/0001-90</p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: '#2c3e50',
    color: 'white',
    padding: '3rem 0 1rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  footerTitle: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem'
  },
  footerSubtitle: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#ecf0f1'
  },
  footerLink: {
    color: '#bdc3c7',
    textDecoration: 'none',
    transition: 'color 0.3s'
  },
  footerBottom: {
    borderTop: '1px solid #34495e',
    paddingTop: '2rem',
    textAlign: 'center',
    color: '#bdc3c7'
  }
}

export default Footer
