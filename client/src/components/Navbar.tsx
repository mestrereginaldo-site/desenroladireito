import React from 'react';
import { Link } from 'react-router-dom';
import balanca from '/images/balanca.jfif';

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={balanca} 
              alt="Desenrola Direito" 
              className="w-8 h-8 object-cover rounded-full"
            />
            <span className="text-xl font-bold">Desenrola Direito</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-300 transition-colors">Home</Link>
            <Link to="/artigos" className="hover:text-blue-300 transition-colors">Artigos</Link>
            <Link to="/calculadoras" className="hover:text-blue-300 transition-colors">Calculadoras</Link>
            <Link to="/consulta-paga" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
              Consulta R$ 29,90
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
