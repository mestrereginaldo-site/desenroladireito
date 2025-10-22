import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div className="header-flex">
        <Link href="/"><a className="logo">Desenrola Direito</a></Link>
        <nav>
          <Link href="/acidente-de-trabalho"><a>Acidente de Trabalho</a></Link>
          <Link href="/erro-medico"><a>Erro Médico</a></Link>
          <Link href="/revisional-consorcio"><a>Revisional Consórcio</a></Link>
          <Link href="/fgts"><a>FGTS</a></Link>
          <Link href="/#contato"><a className="btn-header">Contato</a></Link>
        </nav>
      </div>
    </header>
  )
}
