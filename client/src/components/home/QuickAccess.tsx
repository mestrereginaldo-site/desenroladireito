import { Link } from "wouter";
import { 
  FaGavel, 
  FaBriefcase, 
  FaHome, 
  FaShieldAlt 
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Direito do Consumidor",
    slug: "consumidor",
    icon: <FaShieldAlt className="text-4xl" />
  },
  {
    id: 2,
    name: "Direito Trabalhista",
    slug: "trabalhista",
    icon: <FaBriefcase className="text-4xl" />
  },
  {
    id: 3,
    name: "Direito Civil",
    slug: "civil",
    icon: <FaGavel className="text-4xl" />
  },
  {
    id: 4,
    name: "Direito Constitucional",
    slug: "constitucional",
    icon: <FaHome className="text-4xl" />
  }
];

export default function QuickAccess() {
  return (
    <section id="acesso-rapido" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-primary mb-8">Acesso Rápido</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/categoria/${category.slug}`}>
              <div 
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                data-testid={`card-category-${category.slug}`}
              >
                <div className="text-primary mb-4">
                  {category.icon}
                </div>
                <h4 className="font-medium text-lg">{category.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
