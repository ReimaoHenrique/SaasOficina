"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Camera, Calendar, FileText, Wrench, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServicoById, generateSlug, type Servico } from "@/data/service";

type Foto = {
  id: string;
  url: string;
  tipo: "antes" | "depois" | "durante";
  descricao: string;
  data: string;
};

export default function ServicoDetailPage() {
  const params = useParams();
  const [servico, setServico] = useState<Servico | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar dados do serviço usando a função do data/service
    const foundService = getServicoById(params.id as string);
    setServico(foundService || null);
    setLoading(false);
  }, [params.id]);

  const getStatusBadge = (status: Servico['status']) => {
    const statusConfig = {
      pendente: { label: "Pendente", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
      em_andamento: { label: "Em Andamento", color: "bg-blue-100 text-blue-800", icon: Clock },
      concluido: { label: "Concluído", color: "bg-green-100 text-green-800", icon: CheckCircle },
      aguardando_pecas: { label: "Aguardando Peças", color: "bg-red-100 text-red-800", icon: AlertCircle },
    };

    const config = statusConfig[status] || { label: status, color: "bg-gray-100 text-gray-800", icon: AlertCircle };
    const IconComponent = config.icon;

    return (
      <Badge className={`${config.color} gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (prioridade: string) => {
    const priorityConfig = {
      baixa: { label: "Baixa", color: "bg-green-100 text-green-800" },
      media: { label: "Média", color: "bg-yellow-100 text-yellow-800" },
      alta: { label: "Alta", color: "bg-red-100 text-red-800" },
    };

    const config = priorityConfig[prioridade as keyof typeof priorityConfig] || { label: prioridade, color: "bg-gray-100 text-gray-800" };
    return <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>{config.label}</span>;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando serviço...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!servico) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Serviço não encontrado</h3>
          <p className="text-gray-500 mb-4">O serviço solicitado não foi encontrado.</p>
          <Link href="/servicos">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Serviços
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const slug = generateSlug(servico);
  const fotosAntes = servico.fotos.filter((f: Foto) => f.tipo === 'antes');
  const fotosDepois = servico.fotos.filter((f: Foto) => f.tipo === 'depois');
  const fotosDurante = servico.fotos.filter((f: Foto) => f.tipo === 'durante');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/servicos">
          <Button variant="outline" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Serviços
          </Button>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-2xl font-bold">{servico.veiculo}</h1>
                <span className="text-lg text-gray-600">•</span>
                <span className="text-lg font-medium text-primary">{servico.placa}</span>
                {getPriorityBadge(servico.prioridade)}
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                {getStatusBadge(servico.status)}
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Entrada: {servico.dataEntrada}
                </span>
                {servico.previsaoEntrega && (
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Previsão: {servico.previsaoEntrega}
                  </span>
                )}
                {servico.dataSaida && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Concluído: {servico.dataSaida}
                  </span>
                )}
              </div>

              <div className="flex items-start gap-2 mb-4">
                <FileText className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Descrição do Serviço</h3>
                  <p className="text-gray-700">{servico.descricao}</p>
                </div>
              </div>

              {servico.observacoes && (
                <div className="flex items-start gap-2">
                  <Wrench className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Observações</h3>
                    <p className="text-gray-700">{servico.observacoes}</p>
                  </div>
                </div>
              )}

              {servico.valor && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-lg font-semibold text-green-600">
                    R$ {servico.valor.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              )}
            </div>

            <div className="lg:w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Galeria de Fotos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fotos antes:</span>
                      <span className="font-medium">{fotosAntes.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fotos depois:</span>
                      <span className="font-medium">{fotosDepois.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fotos durante:</span>
                      <span className="font-medium">{fotosDurante.length}</span>
                    </div>
                    <div className="border-t pt-2 mt-3">
                      <div className="text-xs text-gray-500">
                        <strong>Slug gerado:</strong>
                        <div className="mt-1 p-2 bg-gray-100 rounded text-xs font-mono break-all">
                          {slug}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {servico.fotos.length > 0 && (
          <div className="space-y-6">
            {fotosAntes.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Fotos Antes do Serviço
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fotosAntes.map((foto: Foto) => (
                    <div key={foto.id} className="bg-white rounded-lg shadow-sm border p-4">
                      <div className="relative h-48 mb-3 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={foto.url}
                          alt={foto.descricao}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{foto.descricao}</p>
                      <p className="text-xs text-gray-500">{foto.data}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {fotosDepois.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Fotos Depois do Serviço
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fotosDepois.map((foto: Foto) => (
                    <div key={foto.id} className="bg-white rounded-lg shadow-sm border p-4">
                      <div className="relative h-48 mb-3 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={foto.url}
                          alt={foto.descricao}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{foto.descricao}</p>
                      <p className="text-xs text-gray-500">{foto.data}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {fotosDurante.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-500" />
                  Fotos Durante o Serviço
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fotosDurante.map((foto: Foto) => (
                    <div key={foto.id} className="bg-white rounded-lg shadow-sm border p-4">
                      <div className="relative h-48 mb-3 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={foto.url}
                          alt={foto.descricao}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm text-gray-700 mb-1">{foto.descricao}</p>
                      <p className="text-xs text-gray-500">{foto.data}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
