"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  servicosData,
  getServicosByStatus,
  veiculosData,
  type Servico,
} from "@/data/service";
import { ProtectedRoute } from "@/components/protected-route";

export default function ServicosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Servico["status"] | "todos">(
    "todos"
  );

  // Usar dados reais do service.ts
  const servicos: Servico[] = servicosData;

  const filteredServicos = React.useMemo(() => {
    let filtered = servicos;

    // Filtro de status
    if (statusFilter !== "todos") {
      filtered = getServicosByStatus(statusFilter);
    }

    // Filtro de busca (aplicado após o filtro de status)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (servico) =>
          servico.veiculo.toLowerCase().includes(searchLower) ||
          servico.placa.toLowerCase().includes(searchLower) ||
          servico.descricao.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [servicos, statusFilter, searchTerm]);

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
    return (
      <Badge className={config.color}>
        {status === "em_andamento" && <Clock className="h-3 w-3 mr-1" />}
        {status === "concluido" && <CheckCircle className="h-3 w-3 mr-1" />}
        {status === "aguardando_pecas" && (
          <AlertCircle className="h-3 w-3 mr-1" />
        )}
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

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Serviços</h1>
            <p className="text-gray-600">Acompanhe os serviços da oficina</p>
          </div>
          <Link href="/servicos/novo">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Serviço
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar por veículo, placa ou descrição..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={statusFilter === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("todos")}
              >
                Todos
              </Button>
              <Button
                variant={statusFilter === "pendente" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pendente")}
              >
                Pendentes
              </Button>
              <Button
                variant={
                  statusFilter === "em_andamento" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setStatusFilter("em_andamento")}
              >
                Em Andamento
              </Button>
              <Button
                variant={
                  statusFilter === "aguardando_pecas" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setStatusFilter("aguardando_pecas")}
              >
                Aguardando Peças
              </Button>
              <Button
                variant={statusFilter === "concluido" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("concluido")}
              >
                Concluídos
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredServicos.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm border divide-y">
              {filteredServicos.map((servico) => {
                const veiculo = veiculosData.find(
                  (v) => v.placa === servico.placa
                );
                const veiculoId = veiculo?.id || servico.placa; // fallback to placa if vehicle not found

                return (
                  <Link
                    key={`${servico.ordensServico}-${servico.placa}`}
                    href={`/servicos/${veiculoId}`}
                    className="block hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium truncate">
                              {servico.veiculo} • {servico.placa}
                            </h3>
                            {getPriorityBadge(servico.prioridade)}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {servico.descricao}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {getStatusBadge(servico.status)}
                            <span className="text-xs text-gray-500">
                              Entrada: {servico.dataEntrada}
                            </span>
                            {servico.previsaoEntrega && (
                              <span className="text-xs text-gray-500">
                                • Previsão: {servico.previsaoEntrega}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 ml-4 flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Wrench className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Nenhum serviço encontrado
              </h3>
              <p className="mt-1 text-gray-500">
                {searchTerm || statusFilter !== "todos"
                  ? "Nenhum serviço corresponde aos filtros selecionados."
                  : "Você ainda não possui serviços cadastrados."}
              </p>
              {!searchTerm && statusFilter === "todos" && (
                <Link href="/servicos/novo">
                  <Button variant="outline" className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Serviço
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
