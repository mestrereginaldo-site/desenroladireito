export default function Home() {
  return (
    <>
      {/* HERO EXATO DO ORIGINAL */}
      <section className="hero">
        <h1>Desenrola Direito</h1>
        <p>Direito descomplicado para quem precisa receber.</p>
        <a href="#calc" className="cta-button">Comece agora</a>
      </section>

      {/* CONTEÚDO ORIGINAL */}
      <div className="container">
        <h2>Ferramentas gratuitas</h2>
        <p>Calculadoras e modelos para você receber sua indenização sem drama.</p>

        {/* CALCULADORA ORIGINAL */}
        <div id="calc" className="card">
          <h2>Calculadora – Indenização por morte acidente trabalho</h2>
          <label>Salário do trabalhador (R$):</label>
          <input id="sal" type="number" placeholder="Ex: 3000" />
          <label>Nº de dependentes:</label>
          <input id="dep" type="number" min="0" placeholder="Ex: 2" />
          <button onclick="calcular()">Calcular</button>
          <pre id="res"></pre>
        </div>
      </div>

      {/* FOOTER ORIGINAL */}
      <footer>
        <div className="footer-inner">
          <div>
            <h4>Desenrola Direito</h4>
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
            {/* FORMULÁRIO ORIGINAL AQUI DEPOIS */}
          </div>
        </div>
        <div className="copy">© 2025 Desenrola Direito – Todos os direitos reservados.</div>
      </footer>

      {/* SCRIPT ORIGINAL DA CALCULADORA */}
      <script dangerouslySetInnerHTML={{
        __html: `
          function calcular() {
            const sal = parseFloat(document.getElementById('sal').value) || 0;
            const dep = parseInt(document.getElementById('dep').value) || 0;
            const moral = 50000 + (dep * 30000);
            const mensal = (sal * 0.5) + (dep * sal * 0.1);
            document.getElementById('res').innerText =
              'Indenização moral total: R$ ' + moral.toLocaleString('pt-BR') + '\\n' +
              'Pensão mensal estimada: R$ ' + mensal.toLocaleString('pt-BR');
          }
        `
      }} />
    </>
  )
}
