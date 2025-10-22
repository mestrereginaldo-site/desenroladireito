import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/SEOHead";
import { Lock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const consultationSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  whatsapp: z.string().min(10, "WhatsApp inválido (mínimo 10 dígitos)"),
  case: z.string().min(20, "Descreva seu caso com no mínimo 20 caracteres"),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

export default function PaidConsultationPage() {
  const [formData, setFormData] = useState<ConsultationFormData | null>(null);
  const { toast } = useToast();

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      case: "",
    },
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setFormData(data);
    
    try {
      await apiRequest("POST", "/api/paid-consultation", data);
      
      const stripeUrl = "https://buy.stripe.com/5kQ14ndCx9brdDL1Mb4AU00";
      window.location.href = stripeUrl;
    } catch (error) {
      console.error("Error submitting consultation:", error);
      toast({
        title: "Erro ao enviar dados",
        description: "Não foi possível processar sua solicitação. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <SEOHead
        title="Consulta Jurídica Personalizada - R$ 29,90 - Desenrola Direito"
        description="Receba uma resposta personalizada e específica para o seu caso jurídico. Preencha o formulário e pague apenas R$ 29,90 para obter orientação profissional."
        canonical="https://desenroladireito.com.br/consulta-paga"
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              Consulta Jurídica Personalizada
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Receba uma resposta específica para o seu caso
            </p>
            <p className="text-3xl font-bold text-primary">
              Apenas R$ 29,90
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Preencha seus dados</CardTitle>
              <CardDescription>
                Após o preenchimento, você será direcionado para o pagamento seguro via Stripe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Digite seu nome completo" 
                            {...field} 
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(00) 00000-0000" 
                            {...field} 
                            data-testid="input-whatsapp"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="case"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Caso</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva detalhadamente seu caso jurídico..."
                            className="min-h-[150px] resize-none"
                            {...field}
                            data-testid="textarea-case"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Como funciona:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Preencha o formulário com seus dados e descreva seu caso</li>
                      <li>Clique em "Prosseguir para Pagamento" para ser direcionado ao pagamento seguro</li>
                      <li>Complete o pagamento de R$ 29,90 via Stripe</li>
                      <li>Receba a resposta personalizada por WhatsApp em até 24 horas</li>
                    </ol>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    data-testid="button-submit"
                  >
                    Prosseguir para Pagamento - R$ 29,90
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="h-4 w-4" />
              <p>Pagamento seguro processado pela Stripe</p>
            </div>
            <p>Seus dados estão protegidos e serão usados apenas para responder sua consulta</p>
          </div>
        </div>
      </div>
    </div>
  );
}
