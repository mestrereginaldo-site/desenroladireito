import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function FeaturedCategories() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  if (isLoading) {
    return (
      <section id="categorias" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-primary mb-8">Áreas do Direito</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="categorias" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-primary mb-8">Áreas do Direito</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category: any) => (
            <div key={category.id} className="bg-gradient-to-r from-primary to-[#00A3B4] rounded-lg overflow-hidden shadow-lg text-white">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8">
                  <h3 className="text-3xl font-bold mb-4">{category.name}</h3>
                  <p className="mb-6">{category.description}</p>
                  <Link href={`/categorias/${category.slug}`} className="inline-flex items-center text-white font-medium">
                    Saiba mais
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
                <div className="md:w-1/2 h-56 md:h-auto bg-blue-800 overflow-hidden">
                  <div className="w-full h-full bg-blue-900/50 flex items-center justify-center">
                    {category.iconName === 'fa-gavel' && (
                      <img src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c" alt="Direito do Consumidor" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                    )}
                    {category.iconName === 'fa-briefcase' && (
                      <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216" alt="Direito Trabalhista" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                    )}
                    {category.iconName === 'fa-home' && (
                      <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa" alt="Direito Imobiliário" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                    )}
                    {category.iconName === 'fa-users' && (
                      <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300" alt="Direito Familiar" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                    )}
                    {category.iconName === 'fa-shield-alt' && (
                      <img src="https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97" alt="Direito Previdenciário" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                    )}
                    {!category.iconName && (
                      <img src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb" alt="Área de Direito" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
