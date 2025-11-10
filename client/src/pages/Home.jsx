import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Fale com um Advogado em 3 Minutos</h1>
          <p style={styles.heroSubtitle}>
            Consultoria jurídica online por apenas <strong>R$ 29,90</strong>
          </p>
          <Link to="/consultoria" style={styles.ctaButton}>
            QUERO MINHA ORIENTAÇÃO
          </Link>
          <p style={styles.heroNote}>Resposta garantida em até 3 minutos via WhatsApp</p>
        </div>
      </section>

      {/* Features */}
      <section style={styles.features}>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>⚡</div>
          <h3>Rápido</h3>
          <p>Resposta em até 3 minutos via WhatsApp</p>
        </div>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>💰</div>
          <h3>Acessível</h3>
          <p>Apenas R$ 29,90 por consulta</p>
        </div>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>🎯</div>
          <h3>Especializado</h3>
          <p>Advogados especialistas em cada área</p>
        </div>
      </section>

      {/* Artigos em Destaque */}
      <section style={styles.articlesPreview}>
        <h2 style={styles.sectionTitle}>Artigos Jurídicos em Destaque</h2>
        <div style={styles.articlesGrid}>
          <div style={styles.articleCard}>
            <h3>Como contestar uma multa de trânsito</h3>
            <p>Guia completo para recorrer de multas de forma eficaz...</p>
            <Link to="/artigos" style={styles.readMore}>Ler Artigo</Link>
          </div>
          <div style={styles.articleCard}>
            <h3>Direitos do consumidor em compras online</h3>
            <p>Conheça seus direitos nas compras pela internet...</p>
            <Link to="/artigos" style={styles.readMore}>Ler Artigo</Link>
          </div>
          <div style={styles.articleCard}>
            <h3>Guia completo sobre divórcio consensual</h3>
            <p>Entenda o processo de divórcio amigável...</p>
            <Link to="/artigos" style={styles.readMore}>Ler Artigo</Link>
          </div>
        </div>
        <Link to="/artigos" style={styles.viewAllArticles}>
          Ver Todos os 30+ Artigos
        </Link>
      </section>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh'
  },
  hero: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '6rem 2rem',
    textAlign: 'center'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    fontWeight: 'bold'
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    opacity: 0.9
  },
  ctaButton: {
    background: '#e74c3c',
    color: 'white',
    padding: '1rem 2rem',
    textDecoration: 'none',
    borderRadius: '50px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'inline-block',
    margin: '1rem 0',
    transition: 'transform 0.3s'
  },
  heroNote: {
    marginTop: '1rem',
    opacity: 0.8
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  feature: {
    textAlign: 'center',
    padding: '2rem'
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  articlesPreview: {
    padding: '4rem 2rem',
    background: '#f8f9fa',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    color: '#2c3e50'
  },
  articlesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto 3rem'
  },
  articleCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    textAlign: 'left'
  },
  readMore: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  viewAllArticles: {
    background: '#3498db',
    color: 'white',
    padding: '1rem 2rem',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
  }
}

export default Home
