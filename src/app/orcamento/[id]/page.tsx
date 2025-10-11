"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calculator,
  ArrowLeft,
  Printer,
  Edit,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  Car,
  User,
  FileText,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getOrcamentoById,
  type Orcamento,
  type StatusOrcamento,
} from "@/data/orcamento";

export default function OrcamentoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [orcamento, setOrcamento] = useState<Orcamento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orcamentoData = getOrcamentoById(params.id);
    setOrcamento(orcamentoData || null);
    setLoading(false);
  }, [params.id]);

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

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Carregando orçamento...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!orcamento) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Calculator className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            Orçamento não encontrado
          </h3>
          <p className="mt-1 text-gray-500">
            O orçamento solicitado não existe ou foi removido.
          </p>
          <Link href="/orcamento">
            <Button variant="outline" className="mt-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Orçamentos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/orcamento">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                {orcamento.numero}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  className={`text-xs ${getStatusColor(orcamento.status)}`}
                >
                  {getStatusText(orcamento.status)}
                </Badge>
                <span className="text-sm text-gray-500">
                  Criado em {orcamento.dataCriacao}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
            <Button className="gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações do Cliente e Veículo */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome</p>
                    <p className="text-sm">{orcamento.cliente}</p>
                  </div>
                  {orcamento.telefone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Telefone
                        </p>
                        <p className="text-sm">{orcamento.telefone}</p>
                      </div>
                    </div>
                  )}
                </div>
                {orcamento.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        E-mail
                      </p>
                      <p className="text-sm">{orcamento.email}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Informações do Veículo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Veículo</p>
                    <p className="text-sm">{orcamento.veiculo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Placa</p>
                    <p className="text-sm font-mono">{orcamento.placa}</p>
                  </div>
                </div>
                {(orcamento.marca || orcamento.modelo || orcamento.ano) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {orcamento.marca && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Marca
                        </p>
                        <p className="text-sm">{orcamento.marca}</p>
                      </div>
                    )}
                    {orcamento.modelo && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Modelo
                        </p>
                        <p className="text-sm">{orcamento.modelo}</p>
                      </div>
                    )}
                    {orcamento.ano && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Ano</p>
                        <p className="text-sm">{orcamento.ano}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {orcamento.observacoes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Observações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">
                    {orcamento.observacoes}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Resumo do Orçamento */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Resumo do Orçamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    R${" "}
                    {orcamento.total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-sm text-gray-500">Total do Orçamento</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Prazo de Garantia:</span>
                    <span className="font-medium">
                      {orcamento.prazoGarantia} dias
                    </span>
                  </div>
                  {orcamento.dataValidade && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Válido até:</span>
                      <span className="font-medium">
                        {orcamento.dataValidade}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge
                      className={`text-xs ${getStatusColor(orcamento.status)}`}
                    >
                      {getStatusText(orcamento.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Garantia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Todos os serviços e peças possuem garantia de{" "}
                  {orcamento.prazoGarantia} dias contra defeitos de fabricação e
                  mão de obra.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabela de Serviços */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Serviços e Peças</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-center">Qtd</TableHead>
                  <TableHead className="text-right">Preço Unit.</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orcamento.servicos.map((servico, index) => (
                  <TableRow key={servico.id}>
                    <TableCell className="font-medium">
                      {servico.descricao}
                    </TableCell>
                    <TableCell className="text-center">
                      {servico.quantidade}
                    </TableCell>
                    <TableCell className="text-right">
                      R${" "}
                      {servico.precoUnitario.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      R${" "}
                      {servico.total.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total do Orçamento:</span>
                <span className="text-green-600">
                  R${" "}
                  {orcamento.total.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
