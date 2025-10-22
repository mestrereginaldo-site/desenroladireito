import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Article } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Skeleton } from "@/components/ui/skeleton";
import { FaClock, FaArrowRight } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const categoryInfo: Record<string, { name: string; description: string }> = {
  civil: {
    name: "Direito Civil",
    description: "Artigos sobre contratos, responsabilidade civil, família e sucessões.",
  },
  trabalhista: {
    name: "Direito Trabalhista",
    description: "Conteúdo sobre relações de trabalho e legislação trabalhista.",
  },
  consumidor: {
    name: "Direito do Consumidor",
    description: "Guias sobre proteção e direitos dos consumidores.",
  },
  constitucional: {
    name: "Direito Constitucional",
    description: "Estudos sobre a Constituição Federal e direitos fundamentais.",
  },
};

export default function CategoryPage() {
  const [, params] = useRoute("/categoria/:slug");
  const categorySlug = params?.slug || "";
  const category = categoryInfo[categorySlug];

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: [`/api/articles/category/${categorySlug}`],
    enabled: !!categorySlug && !!category,
  });

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Categoria não encontrada</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-primary to-[#00A3B4] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-lg opacity-90">{category.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <AdPlaceholder format="horizontal" />
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Nenhum artigo encontrado nesta categoria ainda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/artigo/${article.slug}`}>
                <Card className="h-full hover:shadow-lg transition cursor-pointer overflow-hidden" data-testid={`card-article-${article.slug}`}>
                  {article.featuredImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        data-testid={`img-article-thumbnail-${article.slug}`}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaClock className="mr-1" />
                        {format(new Date(article.published), "dd MMM", { locale: ptBR })}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3 mb-4">{article.excerpt}</p>
                    <div className="flex items-center text-primary font-medium">
                      Ler mais <FaArrowRight className="ml-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
