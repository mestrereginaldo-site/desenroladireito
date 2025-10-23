import React from 'react';
import balanca from '/images/balanca.jfif';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={balanca} 
                alt="Desenrola Direito" 
                className="w-12 h-12 object-cover rounded mr-3"
              />
              <h3 className="text-2xl font-bold">Desenrola Direito</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Seu direito nas suas mãos. Conteúdo jurídico descomplicado para você resolver seus problemas sem sair de casa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">WhatsApp</span>
                💬
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                📺
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/artigos" className="text-gray-300 hover:text-white transition-colors">Artigos</a></li>
              <li><a href="/calculadoras" className="text-gray-300 hover:text-white transition-colors">Calculadoras</a></li>
              <li><a href="/consulta-paga" className="text-gray-300 hover:text-white transition-colors">Consulta Rápida</a></li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li><a href="/categoria/trabalhista" className="text-gray-300 hover:text-white transition-colors">Direito Trabalhista</a></li>
              <li><a href="/categoria/consumidor" className="text-gray-300 hover:text-white transition-colors">Direito do Consumidor</a></li>
              <li><a href="/categoria/previdenciario" className="text-gray-300 hover:text-white transition-colors">Previdenciário</a></li>
              <li><a href="/categoria/civil" className="text-gray-300 hover:text-white transition-colors">Direito Civil</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} Desenrola Direito. Todos os direitos reservados. |
            <a href="/privacidade" className="hover:text-white transition-colors"> Política de Privacidade</a> |
            <a href="/termos" className="hover:text-white transition-colors"> Termos de Uso</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
