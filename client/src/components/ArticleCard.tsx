import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock } from "lucide-react";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorImage?: string;
  featuredImage?: string;
  readingTime: number;
  published: string;
  slug: string;
}

export function ArticleCard({
  title,
  excerpt,
  category,
  author,
  authorImage,
  featuredImage,
  readingTime,
  published,
  slug,
  id,
}: ArticleCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-article-${id}`}>
      <Link href={`/artigo/${slug}`}>
        <a>
          {featuredImage && (
            <div className="aspect-video overflow-hidden">
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader className="gap-2">
            <Badge className="w-fit" data-testid={`badge-category-${category}`}>
              {category}
            </Badge>
            <h3 className="font-serif text-xl font-semibold leading-tight line-clamp-2">
              {title}
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm line-clamp-3">{excerpt}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={authorImage} />
                <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{author}</span>
                <span className="text-xs text-muted-foreground">{published}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-xs">{readingTime} min</span>
            </div>
          </CardFooter>
        </a>
      </Link>
    </Card>
  );
}
