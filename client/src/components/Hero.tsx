import React from 'react';
import balanca from '/images/balanca.jfif';

export default function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700">
      <img 
        src={balanca} 
        alt="Justiça e Direito" 
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-6 leading-tight">
          Desenrola Direito
        </h1>
        <p className="text-2xl mb-8 opacity-90">
          Seu direito nas suas mãos - Sem complicação, sem escritório
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Começar Agora
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
            Saiba Mais
          </button>
        </div>
      </div>
    </section>
  );
}
