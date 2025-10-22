import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, ArrowLeft } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { SEOHead } from "@/components/SEOHead";
import type { Article } from "@shared/schema";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function ArticlePage() {
  const [, params] = useRoute("/artigo/:slug");
  const slug = params?.slug || "";

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: [`/api/articles/slug/${slug}`],
    enabled: !!slug,
  });

  const { data: allArticles = [] } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && a.category === article?.category)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          <div className="h-16 bg-muted animate-pulse rounded" />
          <div className="h-96 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
        <p className="text-muted-foreground">O artigo que você está procurando não existe.</p>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const articleUrl = `https://desenroladireito.com.br/artigo/${article.slug}`;
  const excerpt = article.excerpt || article.content.replace(/<[^>]*>/g, '').substring(0, 160);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": excerpt,
    "image": article.featuredImage || "https://desenroladireito.com.br/og-image.jpg",
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Desenrola Direito",
      "logo": {
        "@type": "ImageObject",
        "url": "https://desenroladireito.com.br/logo.png"
      }
    },
    "datePublished": new Date(article.published).toISOString(),
    "dateModified": new Date(article.published).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "articleSection": article.category,
    "inLanguage": "pt-BR"
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title={`${article.title} - Desenrola Direito`}
        description={excerpt}
        canonical={articleUrl}
        ogImage={article.featuredImage || "https://desenroladireito.com.br/og-image.jpg"}
        article={{
          publishedTime: new Date(article.published).toISOString(),
          modifiedTime: new Date(article.published).toISOString(),
          author: article.author,
          category: article.category
        }}
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="md:flex-1">
            <article className="max-w-4xl">
              <header className="mb-8">
                <Badge className="mb-3" data-testid="badge-article-category">
                  {article.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{format(new Date(article.published), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readingTime} min de leitura</span>
                </div>

                {article.featuredImage && (
                  <div className="rounded-lg overflow-hidden mb-8 h-96">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-4 mb-8">
                  <span className="text-sm text-gray-600">Compartilhe:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                    data-testid="link-share-facebook"
                  >
                    <FaFacebookF size={18} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                    data-testid="link-share-twitter"
                  >
                    <FaTwitter size={18} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${article.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                    data-testid="link-share-linkedin"
                  >
                    <FaLinkedinIn size={18} />
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${article.title} ${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                    data-testid="link-share-whatsapp"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                </div>
              </header>

              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Payment CTA */}
              <div className="my-12 p-8 bg-primary/5 rounded-lg border-2 border-primary/20 text-center">
                <h3 className="text-xl font-bold mb-4 text-primary">Precisa de ajuda com o seu caso específico?</h3>
                <p className="text-muted-foreground mb-6">Receba uma resposta personalizada para a sua situação</p>
                <Link href="/consulta-paga">
                  <Button size="lg" data-testid="button-consulta-paga">
                    Receba orientação em áudio por R$ 29,90
                  </Button>
                </Link>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg mb-8">
                <Avatar className="w-16 h-16" data-testid="avatar-author">
                  <AvatarImage src={article.authorImage || undefined} alt={article.author} data-testid="img-author-avatar" />
                  <AvatarFallback>{article.author.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-600">Autor</p>
                  <p className="font-semibold text-lg" data-testid="text-author-name">{article.author}</p>
                </div>
              </div>

              {/* Ad banner no meio do conteúdo */}
              <div className="my-8 flex justify-center">
                <AdPlaceholder format="horizontal" />
              </div>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6 text-primary">Artigos Relacionados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedArticles.map((related) => (
                      <Link key={related.id} href={`/artigo/${related.slug}`}>
                        <Card className="h-full hover:shadow-lg transition cursor-pointer" data-testid={`card-related-${related.slug}`}>
                          <CardHeader>
                            <Badge variant="secondary" className="mb-2">{related.category}</Badge>
                            <CardTitle className="line-clamp-2 text-base">{related.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{related.excerpt}</p>
                            <div className="flex items-center text-primary text-sm font-medium">
                              Ler mais <FaArrowRight className="ml-2" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back button */}
              <div className="mt-12 pt-8 border-t">
                <Link href="/artigos">
                  <Button variant="outline" className="gap-2" data-testid="button-voltar-artigos">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para Artigos
                  </Button>
                </Link>
              </div>
            </article>
          </div>

          {/* Sidebar com anúncios */}
          <div className="md:w-[300px] space-y-8 mt-8 md:mt-0">
            <AdPlaceholder format="square" />
            <AdPlaceholder format="square" />
          </div>
        </div>
      </div>

      {/* Ad banner antes da newsletter */}
      <div className="container mx-auto px-4 py-4">
        <AdPlaceholder format="horizontal" className="mx-auto" />
      </div>
    </div>
  );
}
