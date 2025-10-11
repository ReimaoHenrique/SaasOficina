"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  Wrench,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface Service {
  ordensServico: string;
  veiculo: string;
  placa: string;
  descricao: string;
  status:
    | "pendente"
    | "em_andamento"
    | "aguardando_pecas"
    | "concluido"
    | "atrasado";
  prioridade: "baixa" | "media" | "alta";
  dataEntrada: string;
  previsaoEntrega?: string;
}

interface RecentServicesProps {
  services: Service[];
  maxItems?: number;
}

export function RecentServices({
  services,
  maxItems = 5,
}: RecentServicesProps) {
  const getStatusConfig = (status: Service["status"]) => {
    switch (status) {
      case "pendente":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: Clock,
          label: "Pendente",
        };
      case "em_andamento":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: Wrench,
          label: "Em Andamento",
        };
      case "aguardando_pecas":
        return {
          color: "bg-orange-100 text-orange-800 border-orange-200",
          icon: Package,
          label: "Aguardando Peças",
        };
      case "concluido":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          label: "Concluído",
        };
      case "atrasado":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: AlertCircle,
          label: "Atrasado",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: Clock,
          label: status,
        };
    }
  };

  const getPriorityConfig = (priority: Service["prioridade"]) => {
    switch (priority) {
      case "baixa":
        return "bg-green-100 text-green-800 border-green-200";
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "alta":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityText = (priority: Service["prioridade"]) => {
    switch (priority) {
      case "baixa":
        return "Baixa";
      case "media":
        return "Média";
      case "alta":
        return "Alta";
      default:
        return priority;
    }
  };

  const recentServices = services.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-600" />
            Serviços Recentes
          </CardTitle>
          <Link href="/servicos">
            <Button variant="outline" size="sm">
              Ver Todos
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentServices.length > 0 ? (
            recentServices.map((service) => {
              const statusConfig = getStatusConfig(service.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={service.ordensServico}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">
                        {service.veiculo} • {service.placa}
                      </h4>
                      <Badge
                        className={`text-xs ${getPriorityConfig(
                          service.prioridade
                        )}`}
                      >
                        {getPriorityText(service.prioridade)}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {service.descricao}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${statusConfig.color}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Entrada: {service.dataEntrada}
                      </span>
                      {service.previsaoEntrega && (
                        <span className="text-xs text-gray-500">
                          • Previsão: {service.previsaoEntrega}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <Wrench className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-500">Nenhum serviço encontrado</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
