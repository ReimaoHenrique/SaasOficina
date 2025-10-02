"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Camera,
  Calendar,
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVeiculoById, type Veiculo } from "@/data/service";

type Foto = {
  id: string;
  url: string;
  tipo: "antes" | "depois" | "durante";
  descricao: string;
  data: string;
};

export default function VeiculoDetailPage() {
  const params = useParams();
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscar dados do veículo usando a função do data/service
    const foundVehicle = getVeiculoById(params.id as string);
    setVeiculo(foundVehicle || null);
    setLoading(false);
  }, [params.id]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pendente: {
        label: "Pendente",
        color: "bg-yellow-100 text-yellow-800",
        icon: AlertCircle,
      },
      em_andamento: {
        label: "Em Andamento",
        color: "bg-blue-100 text-blue-800",
        icon: Clock,
      },
      concluido: {
        label: "Concluído",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
      },
      aguardando_pecas: {
        label: "Aguardando Peças",
        color: "bg-red-100 text-red-800",
        icon: AlertCircle,
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      color: "bg-gray-100 text-gray-800",
      icon: AlertCircle,
    };
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

    const config = priorityConfig[
      prioridade as keyof typeof priorityConfig
    ] || { label: prioridade, color: "bg-gray-100 text-gray-800" };
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando veículo...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!veiculo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Veículo não encontrado
          </h3>
          <p className="text-gray-500 mb-4">
            O veículo solicitado não foi encontrado.
          </p>
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
        {/* Cabeçalho com informações do veículo */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {veiculo.veiculo}
                </h1>
                <p className="text-xl text-gray-600">
                  Placa:{" "}
                  <span className="font-medium text-primary">
                    {veiculo.placa}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">ID: {veiculo.id}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-sm text-gray-500">
                  Total de serviços:{" "}
                  <span className="font-medium">{veiculo.servicos.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de serviços */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Serviços Realizados
          </h2>

          {veiculo.servicos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <Wrench className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum serviço encontrado
              </h3>
              <p className="text-gray-500">
                Este veículo ainda não possui serviços cadastrados.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {veiculo.servicos.map((servico) => {
                const fotosAntes = servico.fotos.filter(
                  (f: Foto) => f.tipo === "antes"
                );
                const fotosDepois = servico.fotos.filter(
                  (f: Foto) => f.tipo === "depois"
                );
                const fotosDurante = servico.fotos.filter(
                  (f: Foto) => f.tipo === "durante"
                );

                return (
                  <Card key={servico.ordensServico} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl text-gray-900 mb-2">
                            {servico.descricao}
                          </CardTitle>
                          <div className="flex items-center gap-3">
                            {getPriorityBadge(servico.prioridade)}
                            {getStatusBadge(servico.status)}
                          </div>
                        </div>
                        {servico.valor && (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              R$ {servico.valor.toFixed(2).replace(".", ",")}
                            </div>
                            <div className="text-sm text-gray-500">
                              Valor do serviço
                            </div>
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              <strong>Data de Entrada:</strong>{" "}
                              {servico.dataEntrada}
                            </span>
                          </div>
                          {servico.previsaoEntrega && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-5 w-5 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                <strong>Previsão de Entrega:</strong>{" "}
                                {servico.previsaoEntrega}
                              </span>
                            </div>
                          )}
                          {servico.dataSaida && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="text-sm text-green-600">
                                <strong>Concluído em:</strong>{" "}
                                {servico.dataSaida}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          {/* Card lateral com informações das fotos */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Camera className="h-5 w-5 text-gray-600" />
                              <span className="font-medium text-gray-900">
                                Galeria de Fotos
                              </span>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Fotos antes:</span>
                                <span className="font-medium">
                                  {fotosAntes.length}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Fotos depois:</span>
                                <span className="font-medium">
                                  {fotosDepois.length}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Fotos durante:</span>
                                <span className="font-medium">
                                  {fotosDurante.length}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {servico.observacoes && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <Wrench className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium text-blue-900 mb-1">
                                Observações
                              </h3>
                              <p className="text-blue-800">
                                {servico.observacoes}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Galeria de fotos */}
                      {servico.fotos.length > 0 && (
                        <div className="space-y-4">
                          {fotosAntes.length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <Camera className="h-5 w-5" />
                                Fotos Antes do Serviço
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {fotosAntes.map((foto: Foto) => (
                                  <div
                                    key={foto.id}
                                    className="bg-white rounded-lg shadow-sm border p-4"
                                  >
                                    <div className="relative h-48 mb-3 bg-gray-100 rounded-lg overflow-hidden">
                                      <Image
                                        src={foto.url}
                                        alt={foto.descricao}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <p className="text-sm text-gray-700 mb-1">
                                      {foto.descricao}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {foto.data}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {fotosDepois.length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                Fotos Depois do Serviço
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {fotosDepois.map((foto: Foto) => (
                                  <div
                                    key={foto.id}
                                    className="bg-white rounded-lg shadow-sm border p-4"
                                  >
                                    <div className="relative h-48 mb-3 bg-gray-100 rounded-lg overflow-hidden">
                                      <Image
                                        src={foto.url}
                                        alt={foto.descricao}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <p className="text-sm text-gray-700 mb-1">
                                      {foto.descricao}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {foto.data}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {fotosDurante.length > 0 && (
                            <div>
                              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <Wrench className="h-5 w-5 text-blue-500" />
                                Fotos Durante o Serviço
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {fotosDurante.map((foto: Foto) => (
                                  <div
                                    key={foto.id}
                                    className="bg-white rounded-lg shadow-sm border p-4"
                                  >
                                    <div className="relative h-48 mb-3 bg-gray-100 rounded-lg overflow-hidden">
                                      <Image
                                        src={foto.url}
                                        alt={foto.descricao}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <p className="text-sm text-gray-700 mb-1">
                                      {foto.descricao}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {foto.data}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
