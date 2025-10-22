import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@assets/generated_images/Professional_law_library_hero_image_d5f0cf50.png";

export function Hero() {
  const scrollToArticles = () => {
    const articlesSection = document.getElementById("articles-section");
    articlesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">
          Desenrolando Direito
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
          Descomplicando o Direito Brasileiro
        </p>
        <p className="text-lg text-white/80 mb-8 max-w-xl">
          Artigos jurídicos profissionais escritos por especialistas, 
          trazendo clareza para temas complexos do direito.
        </p>
        <div className="flex gap-4">
          <Button
            size="lg"
            onClick={scrollToArticles}
            className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
            data-testid="button-explore-articles"
          >
            Explorar Artigos
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
