import CalculadoraMorte from '../../components/CalculadoraMorte'

export default function MorteAcidenteTrabalho() {
  return (
    <article style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem', fontFamily: 'Arial' }}>
      <h1>Quanto receber por morte em acidente de trabalho? Calculadora 2025</h1>
      <p>
        A morte do trabalhador por acidente de trabalho garante às famílias <strong>indenização por dano moral e material</strong>, além de <strong>pensão mensal vitalícia</strong> para dependentes.
      </p>

      <h2>O que a família tem direito?</h2>
      <ul>
        <li>Dano moral coletivo: R$ 50.000,00 (padrão STF)</li>
        <li>Dano moral individual: R$ 30.000–200.000 por dependente</li>
        <li>Dano material: gastos médicos, funeral, perda de renda</li>
        <li>Pensão mensal: 50 % dos salários + 10 % por dependente extra</li>
      </ul>

      <CalculadoraMorte />

      <h2>Próximo passo gratuito</h2>
      <p>
        Preencha o formulário abaixo e receba em 5 minutos: cálculo detalhado, modelo de petição e checklist de documentos.
      </p>
      {/* FORMULÁRIO TALLY VAI AQUI DEPOIS */}

    </article>
  )
}
