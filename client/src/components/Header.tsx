import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import balanca from '/images/balanca.jfif';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={balanca} 
              alt="Desenrola Direito" 
              className="w-10 h-10 object-cover rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Desenrola Direito</h1>
              <p className="text-sm text-gray-600">Seu direito nas suas mãos</p>
            </div>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/artigos" className="text-gray-700 hover:text-blue-600 transition-colors">Artigos</Link>
            <Link to="/calculadoras" className="text-gray-700 hover:text-blue-600 transition-colors">Calculadoras</Link>
            <Link to="/consulta-paga" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Consulta R$ 29,90
            </Link>
          </nav>

          {/* Menu Mobile Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <div className="space-y-1">
              <div className="w-6 h-1 bg-gray-600"></div>
              <div className="w-6 h-1 bg-gray-600"></div>
              <div className="w-6 h-1 bg-gray-600"></div>
            </div>
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/artigos" className="text-gray-700 hover:text-blue-600 transition-colors">Artigos</Link>
              <Link to="/calculadoras" className="text-gray-700 hover:text-blue-600 transition-colors">Calculadoras</Link>
              <Link to="/consulta-paga" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center">
                Consulta R$ 29,90
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
