"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, Package } from "lucide-react";
import { servicosData, Servico } from "@/data/service";

interface ServicosResumoProps {
  className?: string;
}

export function ServicosResumo({ className = "" }: ServicosResumoProps) {
  // Calcular estatísticas dos serviços
  const stats = {
    concluido: servicosData.filter((s) => s.status === "concluido").length,
    em_andamento: servicosData.filter((s) => s.status === "em_andamento")
      .length,
    pendente: servicosData.filter((s) => s.status === "pendente").length,
    aguardando_pecas: servicosData.filter(
      (s) => s.status === "aguardando_pecas"
    ).length,
  };

  const total = servicosData.length;

  // Calcular serviços atrasados (baseado na previsão de entrega)
  const hoje = new Date();
  const servicosAtrasados = servicosData.filter((servico) => {
    if (!servico.previsaoEntrega || servico.status === "concluido")
      return false;

    const [dia, mes, ano] = servico.previsaoEntrega.split("/");
    const previsao = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));

    return previsao < hoje;
  }).length;

  const resumoCards = [
    {
      titulo: "Concluídos",
      valor: stats.concluido,
      icone: CheckCircle,
      cor: "text-green-600",
      bgCor: "bg-green-100",
      descricao: `${((stats.concluido / total) * 100).toFixed(1)}% do total`,
    },
    {
      titulo: "Em Andamento",
      valor: stats.em_andamento,
      icone: Clock,
      cor: "text-blue-600",
      bgCor: "bg-blue-100",
      descricao: "Serviços ativos",
    },
    {
      titulo: "Aguardando Peças",
      valor: stats.aguardando_pecas,
      icone: Package,
      cor: "text-orange-600",
      bgCor: "bg-orange-100",
      descricao: "Aguardando reposição",
    },
    {
      titulo: "Atrasados",
      valor: servicosAtrasados,
      icone: AlertTriangle,
      cor: "text-red-600",
      bgCor: "bg-red-100",
      descricao: "Acima do prazo",
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
    >
      {resumoCards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.titulo}
                </p>
                <p className="text-2xl font-bold text-gray-900">{card.valor}</p>
                <p className="text-xs text-gray-500 mt-1">{card.descricao}</p>
              </div>
              <div className={`p-3 rounded-full ${card.bgCor}`}>
                <card.icone className={`h-6 w-6 ${card.cor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Hook para obter serviços recentes (últimos 5)
export function useServicosRecentes() {
  return servicosData
    .sort((a, b) => {
      const [diaA, mesA, anoA] = a.dataEntrada.split("/");
      const [diaB, mesB, anoB] = b.dataEntrada.split("/");
      const dataA = new Date(
        parseInt(anoA),
        parseInt(mesA) - 1,
        parseInt(diaA)
      );
      const dataB = new Date(
        parseInt(anoB),
        parseInt(mesB) - 1,
        parseInt(diaB)
      );
      return dataB.getTime() - dataA.getTime();
    })
    .slice(0, 5);
}

// Componente para mostrar serviços recentes em tabela
export function ServicosRecentesTable() {
  const servicosRecentes = useServicosRecentes();

  const getStatusBadge = (status: Servico["status"]) => {
    const statusConfig = {
      pendente: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
      em_andamento: {
        label: "Em Andamento",
        color: "bg-blue-100 text-blue-800",
      },
      concluido: { label: "Concluído", color: "bg-green-100 text-green-800" },
      aguardando_pecas: {
        label: "Aguardando Peças",
        color: "bg-red-100 text-red-800",
      },
    };

    const config = statusConfig[status] || {
      label: status,
      color: "bg-gray-100 text-gray-800",
    };
    return <Badge className={config.color}>{config.label}</Badge>;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Serviços Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {servicosRecentes.map((servico) => (
            <div
              key={`${servico.ordensServico}-${servico.placa}`}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium truncate text-sm">
                    {servico.veiculo} • {servico.placa}
                  </p>
                  {getPriorityBadge(servico.prioridade)}
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {servico.descricao}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusBadge(servico.status)}
                  <span className="text-xs text-gray-500">
                    Entrada: {servico.dataEntrada}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
