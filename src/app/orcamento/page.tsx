"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Calculator,
  ChevronRight,
  DollarSign,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getOrcamentos,
  searchOrcamentos,
  type Orcamento,
  type StatusOrcamento,
} from "@/data/orcamento";
import { ProtectedRoute } from "@/components/protected-route";

export default function OrcamentoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [orcamentos] = useState<Orcamento[]>(() => getOrcamentos());

  const filteredOrcamentos = searchTerm
    ? searchOrcamentos(searchTerm)
    : orcamentos;

  const getStatusColor = (status: StatusOrcamento) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "aprovado":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejeitado":
        return "bg-red-100 text-red-800 border-red-200";
      case "concluido":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: StatusOrcamento) => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "aprovado":
        return "Aprovado";
      case "rejeitado":
        return "Rejeitado";
      case "concluido":
        return "Concluído";
      default:
        return status;
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Orçamentos</h1>
            <p className="text-gray-600">
              Gerencie os orçamentos da sua oficina
            </p>
          </div>
          <Link href="/orcamento/novo">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Orçamento
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar orçamento por número, cliente, veículo..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrcamentos.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm border divide-y">
              {filteredOrcamentos.map((orcamento) => (
                <Link
                  key={orcamento.id}
                  href={`/orcamento/${orcamento.id}`}
                  className="block hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center p-4">
                    <div className="bg-primary/10 p-3 rounded-lg mr-4">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{orcamento.numero}</h3>
                          <Badge
                            className={`text-xs ${getStatusColor(
                              orcamento.status
                            )}`}
                          >
                            {getStatusText(orcamento.status)}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {orcamento.cliente}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-2">
                        <p className="text-sm text-gray-600">
                          {orcamento.veiculo}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-green-600 font-medium">
                            <DollarSign className="h-3 w-3" />
                            R${" "}
                            {orcamento.total.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </span>
                          <span className="text-gray-500">
                            Criado em: {orcamento.dataCriacao}
                          </span>
                          {orcamento.dataValidade && (
                            <span className="text-gray-500">
                              Válido até: {orcamento.dataValidade}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Calculator className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Nenhum orçamento encontrado
              </h3>
              <p className="mt-1 text-gray-500">
                {searchTerm
                  ? "Nenhum orçamento corresponde à sua busca."
                  : "Você ainda não criou nenhum orçamento."}
              </p>
              {!searchTerm && (
                <Link href="/orcamento/novo">
                  <Button variant="outline" className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    Criar Primeiro Orçamento
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
