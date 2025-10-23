import React from 'react';
import balanca from '/images/balanca.jfif';

export default function Hero() {
  return (
    <section className="relative h-[500px] flex items-center justify-center bg-gray-900">
      <img 
        src={balanca} 
        alt="Justiça e Direito" 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">Desenrola Direito</h1>
        <p className="text-xl">Seu direito nas suas mãos</p>
      </div>
    </section>
  );
}
