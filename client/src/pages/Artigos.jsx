import React from 'react'
import { Link } from 'react-router-dom'

const Artigos = () => {
  const artigos = [
    {
      id: 1,
      titulo: 'Como contestar uma multa de trânsito',
      categoria: 'Trânsito',
      descricao: 'Guia completo para recorrer de multas de trânsito de forma eficaz e aumentar suas chances de sucesso.',
      tempoLeitura: '5 min'
    },
    {
      id: 2,
      titulo: 'Direitos do consumidor em compras online',
      categoria: 'Consumidor',
      descricao: 'Conheça todos os seus direitos quando faz compras pela internet e como proceder em caso de problemas.',
      tempoLeitura: '7 min'
    },
    {
      id: 3,
      titulo: 'Guia completo sobre divórcio consensual',
      categoria: 'Família',
      descricao: 'Entenda todo o processo de divórcio amigável, documentos necessários e prazos.',
      tempoLeitura: '8 min'
    },
    {
      id: 4,
      titulo: 'Como reclamar seus direitos trabalhistas',
      categoria: 'Trabalhista',
      descricao: 'Saiba como identificar violações trabalhistas e os passos para reivindicar seus direitos.',
      tempoLeitura: '6 min'
    },
    {
      id: 5,
      titulo: 'Herança: como funciona a partilha de bens',
      categoria: 'Sucessões',
      descricao: 'Entenda como funciona a divisão de bens em inventário e seus direitos na herança.',
      tempoLeitura: '9 min'
    },
    {
      id: 6,
      titulo: 'Contratos: o que observar antes de assinar',
      categoria: 'Civil',
      descricao: 'Dicas essenciais para analisar contratos e evitar problemas futuros.',
      tempoLeitura: '5 min'
    }
  ]

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>📚 Artigos Jurídicos</h1>
        <p>Conteúdo exclusivo para esclarecer suas dúvidas legais</p>
      </div>

      <div style={styles.content}>
        <div style={styles.artigosGrid}>
          {artigos.map(artigo => (
            <article key={artigo.id} style={styles.artigoCard}>
              <div style={styles.artigoHeader}>
                <span style={styles.categoria}>{artigo.categoria}</span>
                <span style={styles.tempoLeitura}>{artigo.tempoLeitura}</span>
              </div>
              <h3 style={styles.artigoTitle}>{artigo.titulo}</h3>
              <p style={styles.artigoDescricao}>{artigo.descricao}</p>
              <div style={styles.artigoFooter}>
                <Link to={`/artigos/${artigo.id}`} style={styles.lerMais}>
                  Ler Artigo Completo
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div style={styles.moreArticles}>
          <h3>+24 artigos jurídicos disponíveis em breve</h3>
          <p>Estamos constantemente atualizando nosso conteúdo para trazer o melhor em informação jurídica.</p>
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
    padding: '3rem 2rem'
  },
  artigosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem'
  },
  artigoCard: {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s'
  },
  artigoHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  categoria: {
    background: '#e74c3c',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  tempoLeitura: {
    color: '#7f8c8d',
    fontSize: '0.8rem'
  },
  artigoTitle: {
    fontSize: '1.4rem',
    marginBottom: '1rem',
    color: '#2c3e50'
  },
  artigoDescricao: {
    color: '#5d6d7e',
    lineHeight: '1.6',
    marginBottom: '1.5rem'
  },
  artigoFooter: {
    borderTop: '1px solid #ecf0f1',
    paddingTop: '1rem'
  },
  lerMais: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.9rem'
  },
  moreArticles: {
    textAlign: 'center',
    padding: '3rem',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  }
}

export default Artigos
