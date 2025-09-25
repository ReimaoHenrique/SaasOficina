"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  nome: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  telefone: z.string().min(10, {
    message: "O telefone deve ter pelo menos 10 dígitos.",
  }),
  assunto: z.string().min(3, {
    message: "O assunto deve ter pelo menos 3 caracteres.",
  }),
  mensagem: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContatoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      assunto: "",
      mensagem: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Form submitted:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      form.reset();
      setIsSubmitted(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Entre em Contato</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Tem alguma dúvida ou sugestão? Preencha o formulário abaixo ou entre em contato por um de nossos canais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                    <p className="text-muted-foreground">Rua Exemplo, 123<br />Bairro, Cidade - UF, CEP 12345-678</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telefone</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+5511999999999" className="hover:text-primary transition-colors">
                        (11) 99999-9999
                      </a>
                      <br />
                      <a href="tel:+5511999999998" className="hover:text-primary transition-colors">
                        (11) 99999-9998
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">E-mail</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:contato@oficinapro.com" className="hover:text-primary transition-colors">
                        contato@oficinapro.com
                      </a>
                      <br />
                      <a href="mailto:suporte@oficinapro.com" className="hover:text-primary transition-colors">
                        suporte@oficinapro.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Horário de Atendimento</h3>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
                <CardDescription>Siga-nos nas redes sociais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {[
                    { name: 'Facebook', icon: 'facebook' },
                    { name: 'Instagram', icon: 'instagram' },
                    { name: 'WhatsApp', icon: 'message-circle' },
                    { name: 'YouTube', icon: 'youtube' },
                  ].map((social, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      size="icon"
                      className="rounded-full"
                      aria-label={social.name}
                    >
                      <div className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Envie-nos uma mensagem</CardTitle>
              <CardDescription>Preencha o formulário abaixo que entraremos em contato o mais breve possível.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Mensagem Enviada!</h3>
                  <p className="text-muted-foreground mb-6">Obrigado pelo seu contato. Retornaremos em breve.</p>
                  <Button onClick={() => setIsSubmitted(false)}>
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input
                      id="nome"
                      {...form.register('nome')}
                      placeholder="Seu nome completo"
                    />
                    {form.formState.errors.nome && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.nome.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        {...form.register('email')}
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        placeholder="(00) 00000-0000"
                        {...form.register('telefone')}
                      />
                      {form.formState.errors.telefone && (
                        <p className="text-sm font-medium text-destructive">
                          {form.formState.errors.telefone.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="assunto">Assunto *</Label>
                    <Input
                      id="assunto"
                      placeholder="Sobre o que você quer falar?"
                      {...form.register('assunto')}
                    />
                    {form.formState.errors.assunto && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.assunto.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem *</Label>
                    <Textarea
                      id="mensagem"
                      rows={5}
                      className="min-h-[120px]"
                      placeholder="Escreva sua mensagem aqui..."
                      {...form.register('mensagem')}
                    />
                    {form.formState.errors.mensagem && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.mensagem.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    * Campos obrigatórios
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
