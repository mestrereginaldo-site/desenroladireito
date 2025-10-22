import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { DocumentTemplate } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const categories = [
  "Todos",
  "Trabalhista",
  "Civil",
  "Consumidor",
  "Família",
  "Criminal",
  "Administrativo"
];

export default function ModelsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: templates = [], isLoading } = useQuery<DocumentTemplate[]>({
    queryKey: ["/api/templates"],
  });

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = selectedCategory === "Todos" || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = async (template: DocumentTemplate) => {
    try {
      await apiRequest("POST", "/api/templates/" + template.slug + "/download");
      
      const link = document.createElement('a');
      link.href = template.fileUrl;
      link.download = template.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao fazer download:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="h-12 bg-muted animate-pulse rounded" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-[hsl(186,100%,35%)] to-[hsl(186,80%,45%)] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Modelos de Petições
            </h1>
            <p className="text-xl opacity-90">
              Baixe gratuitamente modelos de documentos jurídicos em formato Word, prontos para usar
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar modelo de petição..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-templates"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`button-category-${category.toLowerCase()}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {filteredTemplates.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Nenhum modelo encontrado</h3>
                <p className="text-muted-foreground">
                  Tente buscar com outros termos ou selecione outra categoria
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="flex flex-col" data-testid={`card-template-${template.slug}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <FileText className="h-8 w-8 text-primary" />
                      <Badge>{template.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
                      <span>{template.downloads} downloads</span>
                      <span>Formato: Word</span>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => handleDownload(template)}
                      data-testid={`button-download-${template.slug}`}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Modelo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <Card className="mt-12 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>ℹ️ Importante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Os modelos são fornecidos apenas como referência educacional</p>
              <p>• Sempre adapte o documento à sua situação específica</p>
              <p>• Consulte um advogado antes de protocolar qualquer petição</p>
              <p>• Verifique a legislação e jurisprudência atualizadas</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
