import React from 'react'
import { Link } from 'react-router-dom'

const Contato = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>📞 Contato</h1>
        <p>Entre em contato conosco</p>
      </div>

      <div style={styles.content}>
        <div style={styles.contactInfo}>
          <h2>Informações de Contato</h2>
          
          <div style={styles.contactItem}>
            <div style={styles.contactIcon}>📧</div>
            <div>
              <h3>E-mail</h3>
              <p>contato@desenroladireito.com</p>
            </div>
          </div>

          <div style={styles.contactItem}>
            <div style={styles.contactIcon}>📱</div>
            <div>
              <h3>WhatsApp</h3>
              <p>(11) 99999-9999</p>
            </div>
          </div>

          <div style={styles.contactItem}>
            <div style={styles.contactIcon}>🕒</div>
            <div>
              <h3>Horário de Atendimento</h3>
              <p>Segunda a Sexta: 9h às 18h</p>
              <p>Sábado: 9h às 12h</p>
            </div>
          </div>

          <div style={styles.contactItem}>
            <div style={styles.contactIcon}>📍</div>
            <div>
              <h3>Endereço</h3>
              <p>Av. Paulista, 1000 - São Paulo/SP</p>
              <p>CEP: 01310-100</p>
            </div>
          </div>
        </div>

        <div style={styles.quickActions}>
          <h2>Atendimento Rápido</h2>
          <p>Para consultoria jurídica imediata:</p>
          
          <Link to="/consultoria" style={styles.ctaButton}>
            FALAR COM ADVOGADO AGORA
          </Link>

          <div style={styles.note}>
            <p><strong>Resposta em até 3 minutos</strong></p>
            <p>Consultoria por apenas R$ 29,90</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8f9fa'
  },
  header: {
    background: '#2c3e50',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem'
  },
  contactInfo: {
    background: 'white',
    padding: '3rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid #ecf0f1'
  },
  contactIcon: {
    fontSize: '2rem',
    marginRight: '1rem'
  },
  quickActions: {
    background: 'white',
    padding: '3rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  ctaButton: {
    background: '#e74c3c',
    color: 'white',
    padding: '1.5rem 2rem',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'inline-block',
    margin: '2rem 0',
    transition: 'transform 0.3s'
  },
  note: {
    marginTop: '2rem',
    padding: '1.5rem',
    background: '#f8f9fa',
    borderRadius: '5px'
  }
}

export default Contato
