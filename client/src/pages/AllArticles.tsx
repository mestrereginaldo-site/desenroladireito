import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Article } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FaClock, FaArrowRight } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const categories = [
  { name: "Todos", value: "todos" },
  { name: "Direito do Consumidor", value: "Direito do Consumidor" },
  { name: "Direito Trabalhista", value: "Direito Trabalhista" },
  { name: "Direito Civil", value: "Direito Civil" },
  { name: "Direito Constitucional", value: "Direito Constitucional" },
];

export default function AllArticles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  
  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "todos" || 
      article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-12 w-64 mb-8" />
        <Skeleton className="h-10 w-full max-w-md mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
        Todos os Artigos
      </h1>
      
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Pesquisar artigos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
          data-testid="input-search-articles"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Badge
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category.value)}
            data-testid={`badge-category-${category.value.toLowerCase().replace(/ /g, '-')}`}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">
            Nenhum artigo encontrado
          </h2>
          <p className="text-gray-600">
            Tente refinar sua pesquisa ou mudar de categoria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/artigo/${article.slug}`}>
              <Card className="h-full hover:shadow-lg transition cursor-pointer" data-testid={`card-article-${article.slug}`}>
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
      )}
    </div>
  );
}
