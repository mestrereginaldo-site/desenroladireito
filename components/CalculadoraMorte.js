export default function CalculadoraMorte() {
  const calcular = () => {
    const salario = parseFloat(document.getElementById('sal').value) || 0;
    const dep   = parseInt(document.getElementById('dep').value) || 0;
    const moral = 50000 + (dep * 30000);
    const mensal= (salario * 0.5) + (dep * salario * 0.1);
    document.getElementById('res').innerText =
      `Indenização moral total: R$ ${moral.toLocaleString('pt-BR')}\nPensão mensal estimada: R$ ${mensal.toLocaleString('pt-BR')}`;
  };

  return (
    <div style={{border:'1px solid #ccc', padding:'1rem', margin:'1rem 0'}}>
      <h3>Calculadora rápida – Morte acidente trabalho</h3>
      <label>Salário do trabalhador (R$):<br/>
        <input id="sal" type="number" /></label><br/>
      <label>Nº de dependentes:<br/>
        <input id="dep" type="number" min="0" /></label><br/>
      <button onClick={calcular}>Calcular</button>
      <pre id="res" style={{marginTop:'1rem', fontWeight:'bold'}}></pre>
    </div>
  );
}
