import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const consultationSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  area: z.string().min(1, "Selecione uma área do direito"),
  message: z.string().min(20, "Descrição deve ter no mínimo 20 caracteres"),
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

export default function LegalConsultationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      area: "",
      message: "",
    },
  });

  const onSubmit = async (data: ConsultationFormData) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/consultation", data);
      
      toast({
        title: "Solicitação enviada!",
        description: "Em breve um advogado entrará em contato com você.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitar Consulta Jurídica</CardTitle>
        <CardDescription>
          Preencha o formulário abaixo e um advogado especializado entrará em contato com você
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} data-testid="input-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone/WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} data-testid="input-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área do Direito</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-area">
                        <SelectValue placeholder="Selecione a área..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="civil">Direito Civil</SelectItem>
                      <SelectItem value="trabalhista">Direito Trabalhista</SelectItem>
                      <SelectItem value="consumidor">Direito do Consumidor</SelectItem>
                      <SelectItem value="familia">Direito de Família</SelectItem>
                      <SelectItem value="previdenciario">Direito Previdenciário</SelectItem>
                      <SelectItem value="penal">Direito Penal</SelectItem>
                      <SelectItem value="tributario">Direito Tributário</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Caso</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva sua situação com o máximo de detalhes possível..."
                      className="min-h-[150px]"
                      {...field}
                      data-testid="textarea-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-submit">
              {isSubmitting ? "Enviando..." : "Solicitar Consulta"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
