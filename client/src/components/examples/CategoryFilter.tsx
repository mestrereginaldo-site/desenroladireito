import { useState } from "react";
import { CategoryFilter } from "../CategoryFilter";

export default function CategoryFilterExample() {
  const [category, setCategory] = useState("todos");

  return (
    <div className="p-8">
      <CategoryFilter
        selectedCategory={category}
        onCategoryChange={(cat) => {
          console.log("Category changed to:", cat);
          setCategory(cat);
        }}
      />
    </div>
  );
}
