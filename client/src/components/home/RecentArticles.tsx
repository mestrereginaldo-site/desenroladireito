import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Article } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaClock, FaArrowRight } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function RecentArticles() {
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const recentArticles = articles.slice(0, 3);

  if (isLoading) {
    return (
      <section id="recentes" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-primary mb-8">Artigos Recentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="recentes" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-primary mb-8">Artigos Recentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
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
                      {format(new Date(article.published), "dd MMM yyyy", { locale: ptBR })}
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
      </div>
    </section>
  );
}
