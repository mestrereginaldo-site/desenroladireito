import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "Todos", slug: "todos" },
  { name: "Direito Civil", slug: "civil" },
  { name: "Direito Penal", slug: "penal" },
  { name: "Direito Trabalhista", slug: "trabalhista" },
  { name: "Direito do Consumidor", slug: "consumidor" },
  { name: "Direito Constitucional", slug: "constitucional" },
  { name: "Direito Empresarial", slug: "empresarial" },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
        <Badge
          key={cat.slug}
          variant={selectedCategory === cat.slug ? "default" : "outline"}
          className="cursor-pointer hover-elevate active-elevate-2"
          onClick={() => onCategoryChange(cat.slug)}
          data-testid={`filter-category-${cat.slug}`}
        >
          {cat.name}
        </Badge>
      ))}
    </div>
  );
}
