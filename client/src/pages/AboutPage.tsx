import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import draMariaSilva from "@assets/stock_images/professional_woman_l_547af1ce.jpg";
import drJoaoSantos from "@assets/stock_images/professional_female__0d02548a.jpg";
import drReginaldoOliveira from "@assets/generated_images/dr_reginaldo_oliveira.jpg";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Sobre o Desenrola Direito
          </h1>
          <p className="text-lg opacity-90">
            Simplificando o Direito Brasileiro
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="font-serif text-3xl font-bold mb-4">Nossa Missão</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            O Desenrola Direito nasceu com o objetivo de tornar o conhecimento jurídico 
            acessível a todos os brasileiros. Acreditamos que compreender seus direitos e 
            deveres é fundamental para o exercício pleno da cidadania.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Nosso compromisso é produzir conteúdo de alta qualidade, sempre atualizado e 
            baseado nas mais recentes decisões dos tribunais e alterações legislativas. 
            Cada artigo é cuidadosamente elaborado por advogados especializados, garantindo 
            precisão técnica e linguagem acessível.
          </p>

          <h2 className="font-serif text-3xl font-bold mb-4 mt-12">Nossa Equipe</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Contamos com uma equipe multidisciplinar de profissionais do Direito, cada um 
            especializado em diferentes áreas do conhecimento jurídico.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={draMariaSilva} />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">Dra. Maria Silva</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Especialista em Direito do Consumidor
                  </p>
                  <p className="text-sm">
                    Mais de 15 anos de experiência em defesa do consumidor e direito digital.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={drJoaoSantos} />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">Dr. João Santos</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Especialista em Direito Trabalhista
                  </p>
                  <p className="text-sm">
                    Advogado trabalhista com atuação em grandes empresas e sindicatos.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={drReginaldoOliveira} />
                    <AvatarFallback>RO</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg mb-1">Dr. Reginaldo Oliveira</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Especialista em Prática Penal Avançada
                  </p>
                  <p className="text-sm">
                    Advogado criminalista com vasta experiência em tribunais superiores.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="font-serif text-3xl font-bold mb-4 mt-12">Nossos Valores</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Precisão:</strong> Todo conteúdo é revisado por especialistas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Acessibilidade:</strong> Linguagem clara e objetiva</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Atualização:</strong> Conteúdo sempre em dia com as mudanças legislativas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span><strong>Ética:</strong> Compromisso com a verdade e a justiça</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
