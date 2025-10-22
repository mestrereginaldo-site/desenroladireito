import { Search } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { name: "Direito Civil", slug: "civil" },
  { name: "Direito Penal", slug: "penal" },
  { name: "Direito Trabalhista", slug: "trabalhista" },
  { name: "Direito do Consumidor", slug: "consumidor" },
  { name: "Direito Constitucional", slug: "constitucional" },
  { name: "Direito Empresarial", slug: "empresarial" },
];

export function Header() {
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <a className="flex items-center gap-2" data-testid="link-home">
            <h1 className="font-serif text-2xl font-bold">Desenrolando Direito</h1>
          </a>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/">
            <a
              className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                location === "/" ? "text-foreground" : "text-muted-foreground"
              }`}
              data-testid="link-inicio"
            >
              Início
            </a>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-testid="button-categorias">
                Categorias
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.slug} asChild>
                  <Link href={`/categoria/${cat.slug}`}>
                    <a data-testid={`link-categoria-${cat.slug}`}>{cat.name}</a>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/sobre">
            <a
              className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                location === "/sobre" ? "text-foreground" : "text-muted-foreground"
              }`}
              data-testid="link-sobre"
            >
              Sobre
            </a>
          </Link>

          <Link href="/contato">
            <a
              className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                location === "/contato" ? "text-foreground" : "text-muted-foreground"
              }`}
              data-testid="link-contato"
            >
              Contato
            </a>
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            data-testid="button-search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
