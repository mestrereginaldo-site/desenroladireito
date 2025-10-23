import React from 'react';
import balanca from '/images/balanca.jfif';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEOHead({
  title = 'Desenrola Direito - Seu direito nas suas mãos',
  description = 'Conteúdo jurídico descomplicado para você resolver seus problemas sem sair de casa.',
  keywords = 'direito, advogado, consulta jurídica, direito do consumidor, trabalhista, previdenciário',
  image = balanca,
  url = 'https://desenroladireito.com.br'
}: SEOHeadProps) {
  const fullTitle = `${title} | Desenrola Direito`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </>
  );
}
