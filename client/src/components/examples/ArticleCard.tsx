import { ArticleCard } from "../ArticleCard";
import authorAvatar from "@assets/generated_images/Professional_lawyer_author_avatar_6b4fd085.png";
import articleImage from "@assets/generated_images/Legal_article_thumbnail_image_f76b9f1a.png";

export default function ArticleCardExample() {
  return (
    <div className="p-8 max-w-md">
      <ArticleCard
        id="1"
        title="Entendendo os Direitos do Consumidor na Era Digital"
        excerpt="Análise completa sobre como a legislação brasileira protege consumidores em transações online e os desafios modernos do comércio eletrônico."
        category="Direito do Consumidor"
        author="Dra. Maria Silva"
        authorImage={authorAvatar}
        featuredImage={articleImage}
        readingTime={8}
        published="15 de Jan, 2024"
        slug="direitos-consumidor-era-digital"
      />
    </div>
  );
}
