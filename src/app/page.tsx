"use client";

import { Button } from "@/components/ui/button";
import { Camera, Wrench, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "Registro Fotográfico",
      description: "Registre fotos detalhadas do veículo ao recebê-lo na oficina.",
      delay: 0.1
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: "Gestão de Serviços",
      description: "Acompanhe todos os serviços realizados em cada veículo.",
      delay: 0.2
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Histórico Completo",
      description: "Acesse todo o histórico de manutenções do veículo.",
      delay: 0.3
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Segurança",
      description: "Dados protegidos e armazenados com segurança.",
      delay: 0.4
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  } as const;

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-28">
        <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iI0Y0MDQwNCIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+Cg==")`
            }}
          />
        </div>
        
        <div className="container relative px-4 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium shadow-sm transition-colors bg-background/50 backdrop-blur-sm mb-6"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Em tempo real • Disponível agora
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Gestão completa para sua
            <span className="relative whitespace-nowrap text-primary">
              <span className="relative"> oficina</span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Gerencie veículos, serviços e clientes de forma simples e eficiente com nossa plataforma especializada.
            Tudo em um só lugar, acessível de qualquer dispositivo.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/veiculos/novo" className="w-full sm:w-auto">
              <Button size="lg" className="w-full gap-2 group">
                Começar agora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/sobre" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                Saiba mais
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 relative">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Tudo o que você precisa em um só lugar</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas projetadas para simplificar a gestão da sua oficina mecânica.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={feature.delay}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-primary/5">
        <div className="absolute inset-0 bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.05] bg-[size:40px_40px]" />
        <div className="container relative px-4 mx-auto text-center">
          <Card className="mx-auto max-w-3xl bg-background/50 backdrop-blur-sm border-primary/20 shadow-lg overflow-hidden">
            <CardHeader className="space-y-1 text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Pronto para transformar sua oficina?
                </CardTitle>
                <CardDescription className="mt-2">
                  Cadastre-se agora e experimente gratuitamente por 14 dias.
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cadastro" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full group">
                    Criar Conta Gratuita
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contato" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full">
                    Fale Conosco
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Sem cartão de crédito necessário • Cancele a qualquer momento
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
