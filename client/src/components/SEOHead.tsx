import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    category?: string;
  };
  structuredData?: object;
}

export function SEOHead({
  title = "Desenrola Direito – orientação jurídica em áudio R$ 29,90",
  description = "Receba resposta de advogado em 3 min por R$ 29,90. Sem sair de casa, sem consulta presencial. Clique e fale agora.",
  canonical,
  ogImage = "https://desenroladireito.com.br/og-image.jpg",
  article,
  structuredData
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    
    updateMetaTag('name', 'description', description);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);
    
    if (canonical) {
      updateCanonical(canonical);
      updateMetaTag('property', 'og:url', canonical);
      updateMetaTag('name', 'twitter:url', canonical);
    }
    
    if (article) {
      updateMetaTag('property', 'og:type', 'article');
      if (article.publishedTime) {
        updateMetaTag('property', 'article:published_time', article.publishedTime);
      }
      if (article.modifiedTime) {
        updateMetaTag('property', 'article:modified_time', article.modifiedTime);
      }
      if (article.author) {
        updateMetaTag('property', 'article:author', article.author);
      }
      if (article.category) {
        updateMetaTag('property', 'article:section', article.category);
      }
    } else {
      updateMetaTag('property', 'og:type', 'website');
    }
    
    if (structuredData) {
      addStructuredData(structuredData);
    }
  }, [title, description, canonical, ogImage, article, structuredData]);
  
  return null;
}

function updateMetaTag(attribute: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonical(url: string) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
}

function addStructuredData(data: object) {
  const existingScript = document.querySelector('script[data-seo="dynamic"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('data-seo', 'dynamic');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
