export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <h3>Desenrola Direito</h3>
          <p>Advocacia moderna, resultados sem complicação.</p>
          <p>OAB/SC 99.999 | Dr. Reginaldo Oliveira</p>
        </div>
        <div>
          <h4>Ferramentas</h4>
          <ul>
            <li><a href="/calculadora/morte-acidente-trabalho">Calculadora Acidente</a></li>
            <li><a href="/calculadora/fgts">Calculadora FGTS</a></li>
          </ul>
        </div>
        <div>
          <h4>Modelos</h4>
          <ul>
            <li><a href="/modelos/peticao-acidente-trabalho">Petição Acidente</a></li>
            <li><a href="/modelos/revisional-consorcio">Revisional Consórcio</a></li>
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p>Receba dicas jurídicas e novidades.</p>
          {/* FORMULÁRIO TALLY AQUI DEPOIS */}
        </div>
      </div>
      <div className="copy">© 2025 Desenrola Direito – Todos os direitos reservados.</div>
    </footer>
  )
}
