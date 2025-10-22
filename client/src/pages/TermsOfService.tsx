export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="heading-terms">
            Termos de Uso
          </h1>
          <p className="text-lg opacity-90">
            Última atualização: 02 de outubro de 2025
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="font-serif text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ao acessar e usar o site Desenrola Direito ("Site"), você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá usar nosso Site.
          </p>

          <h2 className="font-serif text-2xl font-bold mb-4 mt-8">2. Descrição do Serviço</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            O Desenrola Direito é um blog jurídico que fornece informações educacionais sobre diversos ramos do direito brasileiro. Nosso conteúdo inclui artigos, guias, calculadoras jurídicas e outras ferramentas informativas destinadas ao público geral.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            <strong>Importante:</strong> O conteúdo disponibilizado neste Site possui caráter exclusivamente informativo e educacional, não constituindo consultoria jurídica, aconselhamento legal ou prestação de serviços advocatícios.
          </p>

          <h2 className="font-serif text-2xl font-bold mb-4 mt-8">3. Limitações de Responsabilidade</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            O Desenrola Direito não se responsabiliza por:
          </p>
          <ul className="text-muted-foreground leading-relaxed mb-6 list-disc pl-6">
            <li>Decisões tomadas com base exclusivamente nas informações do Site sem consulta a um advogado</li>
            <li>Eventuais erros, omissões ou desatualizações no conteúdo publicado</li>
            <li>Resultados específicos de processos judiciais ou administrativos</li>
            <li>Danos diretos ou indiretos decorrentes do uso ou impossibilidade de uso do Site</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold mb-4 mt-8">4. Propriedade Intelectual</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Todo o conteúdo do Site, incluindo textos, imagens, logotipos, gráficos e código-fonte, é protegido por direitos autorais e pertence ao Desenrola Direito ou aos seus licenciadores. É proibida a reprodução, distribuição ou modificação do conteúdo sem autorização prévia por escrito.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Uso permitido: Você pode compartilhar links para nossos artigos e citar trechos do conteúdo, desde que faça referência clara à fonte (Desenrola Direito) e ao autor do artigo.
          </p>

          <h2 className="font-serif text-2xl font-bold mb-4 mt-8">5. Calculadoras Jurídicas</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            As calculadoras disponibilizadas no Site têm finalidade meramente ilustrativa e educacional. Os valores e resultados apresentados são aproximados e podem não refletir exatamente sua situação específica.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Recomendamos enfaticamente a consulta a um advogado especializado para análise precisa de sua situação jurídica e cálculos definitivos de valores.
          </p>

          <h2 className="font-serif text-2xl font-bold mb-4 mt-8">6. Consultas Jurídicas</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            O formulário de consulta jurídica disponibilizado no Site destina-se exclusivamente ao contato inicial. O envio do formulário não estabelece relação cliente-advogado, não cria obrigação de prestação de serviços por nossa parte, e as informações fornecidas não serão tratadas como comunicação privilegiada até a formalização de contrato de prestação de serviços advocatícios.
          </p>

          <h2 className="font-serif text-2xl font-bold mb-4 mt-8">7. Links Externos e Publicidade</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            O Site pode conter links para sites de terceiros e anúncios publicitários. Não nos responsabilizamos pelo conteúdo, políticas de privacidade ou práticas de sites externos. A inclusão de qualquer link ou anúncio não implica aprovação ou recomendação dos produtos ou serviços anunciados.
          </p>

          <h2 className="font-serif text-2xl font-bold mb-4 mt-8">8. Modificações dos Termos</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no Site. O uso continuado do Site após as modificações constitui aceitação dos novos termos.
          </p>

          <h2 className="font-serif text-2xl font-bold mb-4 mt-8">9. Lei Aplicável e Jurisdição</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas relacionadas a estes termos serão submetidas à jurisdição exclusiva do foro da Comarca de Jaraguá do Sul, Estado de Santa Catarina.
          </p>

          <h2 className="font-serif text-2xl font-bold mb-4 mt-8">10. Contato</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Para questões sobre estes Termos de Uso, entre em contato através da nossa página de contato ou pelos seguintes meios:
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            <strong>Desenrola Direito</strong><br />
            Av. Marechal Deodoro da Fonseca, 1188<br />
            Centro - Jaraguá do Sul - SC<br />
            CEP: 89.251-702
          </p>
        </div>
      </div>
    </div>
  );
}
