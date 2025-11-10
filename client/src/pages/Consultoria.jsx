import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Consultoria = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    area: '',
    problema: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui será a integração com o Stripe
    alert('Formulário enviado! Em breve você será redirecionado para o pagamento.')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>📞 Consultoria Jurídica</h1>
        <p>Fale com um advogado especializado em até 3 minutos</p>
      </div>

      <div style={styles.content}>
        <div style={styles.formContainer}>
          <h2>Consulta por Apenas R$ 29,90</h2>
          <p>Preencha o formulário abaixo e você será redirecionado para o pagamento seguro.</p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="nome">Nome completo *</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="telefone">WhatsApp *</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email">E-mail *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="area">Área do Direito *</label>
              <select
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                style={styles.input}
              >
                <option value="">Selecione uma área...</option>
                <option value="consumidor">Direito do Consumidor</option>
                <option value="trabalhista">Direito Trabalhista</option>
                <option value="civil">Direito Civil</option>
                <option value="familia">Direito de Família</option>
                <option value="penal">Direito Penal</option>
                <option value="administrativo">Direito Administrativo</option>
                <option value="ambiental">Direito Ambiental</option>
                <option value="digital">Direito Digital</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="problema">Descreva seu problema *</label>
              <textarea
                id="problema"
                name="problema"
                value={formData.problema}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Descreva brevemente sua situação jurídica..."
                style={styles.textarea}
              />
            </div>

            <button type="submit" style={styles.submitButton}>
              PAGAR R$ 29,90 E FALAR COM ADVOGADO
            </button>
          </form>
        </div>

        <div style={styles.info}>
          <h3>Como funciona?</h3>
          <div style={styles.steps}>
            <div style={styles.step}>
              <div style={styles.stepNumber}>1</div>
              <p>Preencha o formulário e pague a consulta</p>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>2</div>
              <p>Receba a confirmação por e-mail</p>
            </div>
            <div style={styles.step}>
              <div style={styles.stepNumber}>3</div>
              <p>Um advogado entra em contato em até 3 minutos</p>
            </div>
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
    gridTemplateColumns: '2fr 1fr',
    gap: '4rem'
  },
  formContainer: {
    background: 'white',
    padding: '3rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  form: {
    marginTop: '2rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    marginTop: '0.5rem'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px',
    marginTop: '0.5rem',
    fontFamily: 'inherit'
  },
  submitButton: {
    background: '#e74c3c',
    color: 'white',
    padding: '1.5rem 2rem',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    transition: 'background 0.3s'
  },
  info: {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    height: 'fit-content'
  },
  steps: {
    marginTop: '2rem'
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  stepNumber: {
    background: '#3498db',
    color: 'white',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    fontWeight: 'bold'
  }
}

export default Consultoria
