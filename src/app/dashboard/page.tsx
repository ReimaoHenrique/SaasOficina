"use client";

import { useState } from "react";
import {
  BarChart3,
  Wrench,
  CheckCircle,
  Clock,
  Package,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/stats-card";
import { RecentServices } from "@/components/recent-services";
import { ProtectedRoute } from "@/components/protected-route";
import { servicosData, type Servico } from "@/data/service";

export default function DashboardPage() {
  const [servicos] = useState<Servico[]>(() => servicosData);

  // Calcular estatísticas dos serviços
  const totalServicos = servicos.length;
  const servicosConcluidos = servicos.filter(
    (s) => s.status === "concluido"
  ).length;
  const servicosEmAndamento = servicos.filter(
    (s) => s.status === "em_andamento"
  ).length;
  const servicosAguardandoPecas = servicos.filter(
    (s) => s.status === "aguardando_pecas"
  ).length;
  const servicosPendentes = servicos.filter(
    (s) => s.status === "pendente"
  ).length;

  // Calcular serviços atrasados (previsão passou e não concluído)
  const hoje = new Date();
  const servicosAtrasados = servicos.filter((s) => {
    if (s.status === "concluido") return false;
    if (!s.previsaoEntrega) return false;

    const previsao = new Date(s.previsaoEntrega.split("/").reverse().join("-"));
    return previsao < hoje;
  }).length;

  // Calcular percentuais
  const percentualConcluidos =
    totalServicos > 0
      ? Math.round((servicosConcluidos / totalServicos) * 100)
      : 0;
  const percentualAtrasados =
    totalServicos > 0
      ? Math.round((servicosAtrasados / totalServicos) * 100)
      : 0;

  // Dados para o gráfico de status (simulado)
  const statusData = [
    { status: "Concluídos", count: servicosConcluidos, color: "bg-green-500" },
    {
      status: "Em Andamento",
      count: servicosEmAndamento,
      color: "bg-blue-500",
    },
    {
      status: "Aguardando Peças",
      count: servicosAguardandoPecas,
      color: "bg-orange-500",
    },
    { status: "Pendentes", count: servicosPendentes, color: "bg-yellow-500" },
    { status: "Atrasados", count: servicosAtrasados, color: "bg-red-500" },
  ];

  // Serviços recentes (últimos 5)
  const servicosRecentes = servicos.slice(0, 5);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Visão geral dos serviços e estatísticas da oficina
            </p>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total de Serviços"
              value={totalServicos}
              description="Serviços cadastrados"
              icon={BarChart3}
              color="blue"
            />
            <StatsCard
              title="Concluídos"
              value={servicosConcluidos}
              description={`${percentualConcluidos}% do total`}
              icon={CheckCircle}
              color="green"
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Em Andamento"
              value={servicosEmAndamento}
              description="Serviços ativos"
              icon={Wrench}
              color="blue"
            />
            <StatsCard
              title="Atrasados"
              value={servicosAtrasados}
              description={`${percentualAtrasados}% do total`}
              icon={AlertTriangle}
              color="red"
              trend={{ value: 5, isPositive: false }}
            />
          </div>

          {/* Segunda linha de estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Aguardando Peças"
              value={servicosAguardandoPecas}
              description="Serviços parados"
              icon={Package}
              color="orange"
            />
            <StatsCard
              title="Pendentes"
              value={servicosPendentes}
              description="Aguardando início"
              icon={Clock}
              color="yellow"
            />
            <StatsCard
              title="Taxa de Conclusão"
              value={`${percentualConcluidos}%`}
              description="Eficiência geral"
              icon={TrendingUp}
              color="green"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Distribuição por Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusData.map((item) => {
                    const percentage =
                      totalServicos > 0
                        ? Math.round((item.count / totalServicos) * 100)
                        : 0;
                    return (
                      <div
                        key={item.status}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${item.color}`}
                          ></div>
                          <span className="text-sm font-medium">
                            {item.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">
                            {item.count}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({percentage}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Barra de progresso visual */}
                <div className="mt-6">
                  <div className="flex h-4 rounded-lg overflow-hidden">
                    {statusData.map((item) => {
                      const percentage =
                        totalServicos > 0
                          ? (item.count / totalServicos) * 100
                          : 0;
                      return (
                        <div
                          key={item.status}
                          className={`${item.color}`}
                          style={{ width: `${percentage}%` }}
                          title={`${item.status}: ${item.count} (${Math.round(
                            percentage
                          )}%)`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Serviços Recentes */}
            <RecentServices services={servicosRecentes} maxItems={5} />
          </div>

          {/* Cards de Ação Rápida */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Wrench className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Novo Serviço</h3>
                    <p className="text-sm text-gray-600">
                      Cadastrar novo serviço
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Novo Orçamento</h3>
                    <p className="text-sm text-gray-600">Criar orçamento</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Estoque</h3>
                    <p className="text-sm text-gray-600">Gerenciar peças</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informações Adicionais */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Próximas Entregas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {servicos
                    .filter(
                      (s) => s.previsaoEntrega && s.status !== "concluido"
                    )
                    .slice(0, 3)
                    .map((servico) => (
                      <div
                        key={servico.ordensServico}
                        className="flex justify-between items-center p-2 border rounded"
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {servico.veiculo}
                          </p>
                          <p className="text-xs text-gray-600">
                            {servico.placa}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {servico.previsaoEntrega}
                          </p>
                          <p className="text-xs text-gray-500">
                            {servico.descricao}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Resumo Executivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Serviços no prazo:</span>
                    <span className="font-medium text-green-600">
                      {totalServicos - servicosAtrasados}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Taxa de eficiência:</span>
                    <span className="font-medium text-blue-600">
                      {percentualConcluidos}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Serviços críticos:</span>
                    <span className="font-medium text-red-600">
                      {servicos.filter((s) => s.prioridade === "alta").length}
                    </span>
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
