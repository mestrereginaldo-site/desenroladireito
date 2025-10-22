import { useEffect } from "react";

export function CTABlocks() {
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0) {
        if (!sessionStorage.getItem('ddExit')) {
          if (confirm('🎧 Receba orientação jurídica em áudio por apenas R$ 29,90?')) {
            window.open('/consulta-paga', '_blank');
          }
          sessionStorage.setItem('ddExit', '1');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <>
      {/* Mobile Sticky Footer */}
      <div className="cta-sticky-mob">
        <a href="/consulta-paga" target="_blank" rel="noopener" data-testid="link-cta-mobile">
          <span>💬</span> R$ 29,90 áudio 3 min
        </a>
      </div>

      {/* Desktop Side Card */}
      <div className="cta-side-desk">
        <div>
          <strong>Fale com um advogado</strong>
          <br />
          em 3 min – R$ 29,90
        </div>
        <a href="/consulta-paga" target="_blank" rel="noopener" data-testid="link-cta-desktop">
          <span>💬</span> Quero minha orientação
        </a>
      </div>
    </>
  );
}
