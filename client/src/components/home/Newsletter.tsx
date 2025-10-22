import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaEnvelope } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossos artigos em primeira mão.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Erro ao inscrever",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <FaEnvelope className="text-5xl mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Receba Nossos Artigos</h3>
          <p className="text-lg mb-8 opacity-90">
            Cadastre-se e receba em primeira mão os melhores artigos sobre direito direto no seu email.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-gray-900"
              data-testid="input-newsletter-email"
            />
            <Button 
              type="submit" 
              variant="secondary" 
              className="whitespace-nowrap"
              data-testid="button-newsletter-subscribe"
            >
              Inscrever-se
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
