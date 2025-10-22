import { useState } from "react";
import { Link, useLocation } from "wouter";
import { FaBalanceScale, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface NavLink {
  name: string;
  href?: string;
  submenu?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: "Início", href: "/" },
  { name: "Artigos", href: "/artigos" },
  { 
    name: "Calculadora", 
    submenu: [
      { name: "Rescisão Trabalhista", href: "/calculadoras#rescisao" },
      { name: "Multas de Trânsito", href: "/calculadoras#multa-transito" },
      { name: "Dano Moral", href: "/calculadoras#indenizacao" },
      { name: "Pensão Alimentícia", href: "/calculadoras#pensao" },
    ]
  },
  { name: "Modelos", href: "/modelos" },
  { name: "Consulta Jurídica", href: "/consulta-juridica" },
  { name: "Contato", href: "/contato" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center" data-testid="link-home">
          <FaBalanceScale className="text-4xl text-primary mr-3" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              Desenrola Direito
            </h1>
            <p className="text-sm text-gray-600">Simplificando o Direito</p>
          </div>
        </Link>
        
        <button
          className="md:hidden text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-testid="button-menu-toggle"
        >
          {isMenuOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>

        <nav className={cn(
          "absolute md:relative top-16 md:top-0 left-0 right-0 md:left-auto md:right-auto bg-white md:bg-transparent shadow-md md:shadow-none flex-col md:flex-row md:flex md:space-x-6 p-4 md:p-0",
          isMenuOpen ? "flex" : "hidden md:flex"
        )}>
          {navLinks.map((link) => {
            if (link.submenu) {
              return (
                <div key={link.name} className="relative group">
                  <button
                    className="text-gray-700 hover:text-primary font-medium transition py-2 md:py-0 flex items-center w-full md:w-auto"
                    onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                    data-testid={`menu-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                    <FaChevronDown className="ml-1 text-xs" />
                  </button>
                  <div className={cn(
                    "md:absolute md:left-0 md:mt-2 md:w-56 bg-white md:shadow-lg md:rounded-md overflow-hidden",
                    "md:group-hover:block",
                    openDropdown === link.name ? "block" : "hidden md:hidden"
                  )}>
                    {link.submenu.map((sublink) => (
                      <Link
                        key={sublink.href}
                        href={sublink.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        data-testid={`submenu-${sublink.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            
            return (
              <Link
                key={link.href}
                href={link.href!}
                className={cn(
                  "text-gray-700 hover:text-primary font-medium transition py-2 md:py-0",
                  location === link.href && "text-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
                data-testid={`link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
