"use client";

import {
  Package,
  Construction,
  Wrench,
  AlertCircle,
  ArrowLeft,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from "@/components/protected-route";
import { useRouter } from "next/navigation";

export default function EstoquePage() {
  const router = useRouter();

  // Dados simulados de estoque em desenvolvimento
  const estoqueData = [
    {
      id: "1",
      categoria: "Motor",
      pecas: [
        { nome: "Filtro de óleo", quantidade: 25, minimo: 10, status: "ok" },
        { nome: "Óleo 5W30", quantidade: 8, minimo: 15, status: "baixo" },
        { nome: "Correia dentada", quantidade: 5, minimo: 3, status: "ok" },
        {
          nome: "Vela de ignição",
          quantidade: 2,
          minimo: 20,
          status: "critico",
        },
      ],
    },
    {
      id: "2",
      categoria: "Freios",
      pecas: [
        {
          nome: "Pastilha de freio dianteira",
          quantidade: 12,
          minimo: 8,
          status: "ok",
        },
        { nome: "Disco de freio", quantidade: 6, minimo: 5, status: "ok" },
        { nome: "Fluido de freio", quantidade: 3, minimo: 10, status: "baixo" },
        {
          nome: "Cilindro mestre",
          quantidade: 1,
          minimo: 2,
          status: "critico",
        },
      ],
    },
    {
      id: "3",
      categoria: "Suspensão",
      pecas: [
        {
          nome: "Amortecedor dianteiro",
          quantidade: 4,
          minimo: 2,
          status: "ok",
        },
        {
          nome: "Mola helicoidal",
          quantidade: 0,
          minimo: 4,
          status: "critico",
        },
        {
          nome: "Buchas de borracha",
          quantidade: 15,
          minimo: 10,
          status: "ok",
        },
      ],
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "ok":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          label: "Estoque OK",
        };
      case "baixo":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: AlertCircle,
          label: "Estoque Baixo",
        };
      case "critico":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: AlertCircle,
          label: "Estoque Crítico",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Package,
          label: "Indefinido",
        };
    }
  };

  const totalPecas = estoqueData.reduce(
    (acc, categoria) => acc + categoria.pecas.length,
    0
  );
  const pecasBaixas = estoqueData.reduce(
    (acc, categoria) =>
      acc + categoria.pecas.filter((p) => p.status === "baixo").length,
    0
  );
  const pecasCriticas = estoqueData.reduce(
    (acc, categoria) =>
      acc + categoria.pecas.filter((p) => p.status === "critico").length,
    0
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="mr-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Estoque</h1>
                <p className="text-gray-600 mt-1">
                  Gestão de peças e componentes
                </p>
              </div>
            </div>

            {/* Banner de Desenvolvimento */}
            <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Construction className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-blue-900 mb-2">
                      🚧 Módulo em Desenvolvimento
                    </h2>
                    <p className="text-blue-700 mb-4">
                      O sistema de gestão de estoque está sendo desenvolvido e
                      estará disponível em breve. Enquanto isso, você pode
                      visualizar os dados simulados abaixo.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Clock className="h-4 w-4" />
                      <span>Previsão de lançamento: Dezembro 2024</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas Resumidas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalPecas}</p>
                      <p className="text-sm text-gray-600">Total de Peças</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {totalPecas - pecasBaixas - pecasCriticas}
                      </p>
                      <p className="text-sm text-gray-600">Estoque OK</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <AlertCircle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {pecasBaixas}
                      </p>
                      <p className="text-sm text-gray-600">Estoque Baixo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {pecasCriticas}
                      </p>
                      <p className="text-sm text-gray-600">Estoque Crítico</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Categorias e Peças */}
            <div className="space-y-6">
              {estoqueData.map((categoria) => (
                <Card key={categoria.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-blue-600" />
                      {categoria.categoria}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categoria.pecas.map((peca, index) => {
                        const statusConfig = getStatusConfig(peca.status);
                        const StatusIcon = statusConfig.icon;

                        return (
                          <div
                            key={index}
                            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-sm">
                                {peca.nome}
                              </h4>
                              <Badge
                                className={`text-xs ${statusConfig.color}`}
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">
                                  Quantidade:
                                </span>
                                <span className="font-medium">
                                  {peca.quantidade}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Mínimo:</span>
                                <span className="font-medium">
                                  {peca.minimo}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-600">Status:</span>
                                <span
                                  className={`font-medium ${
                                    peca.status === "ok"
                                      ? "text-green-600"
                                      : peca.status === "baixo"
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {peca.status === "ok"
                                    ? "OK"
                                    : peca.status === "baixo"
                                    ? "Baixo"
                                    : "Crítico"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Funcionalidades Futuras */}
            <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Truck className="h-5 w-5" />
                  Funcionalidades em Desenvolvimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">
                      📦 Controle de Entrada
                    </h4>
                    <p className="text-sm text-purple-700">
                      Registro automático de novas peças e componentes
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">
                      📊 Relatórios
                    </h4>
                    <p className="text-sm text-purple-700">
                      Relatórios detalhados de consumo e movimentação
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">
                      🔔 Alertas
                    </h4>
                    <p className="text-sm text-purple-700">
                      Notificações automáticas de estoque baixo
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">
                      🏷️ Códigos de Barras
                    </h4>
                    <p className="text-sm text-purple-700">
                      Sistema de códigos de barras para controle
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">
                      💰 Preços
                    </h4>
                    <p className="text-sm text-purple-700">
                      Controle de preços e margens de lucro
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">
                      📱 Mobile
                    </h4>
                    <p className="text-sm text-purple-700">
                      App mobile para consulta rápida de estoque
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
