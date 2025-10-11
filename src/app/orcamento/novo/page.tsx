"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator, Save, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createOrcamento, type ServicoOrcamento } from "@/data/orcamento";

type Servico = {
  id: string;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  total: number;
};

export default function NovoOrcamento() {
  const router = useRouter();
  const [servicos, setServicos] = useState<Servico[]>([
    { id: "1", descricao: "", quantidade: 1, precoUnitario: 0, total: 0 },
  ]);

  const [dadosOrcamento, setDadosOrcamento] = useState({
    cliente: "",
    telefone: "",
    email: "",
    veiculo: "",
    placa: "",
    marca: "",
    modelo: "",
    ano: "",
    observacoes: "",
    prazoGarantia: "90",
    validadeOrcamento: "10",
  });

  const addServico = () => {
    const novoId = (servicos.length + 1).toString();
    setServicos([
      ...servicos,
      {
        id: novoId,
        descricao: "",
        quantidade: 1,
        precoUnitario: 0,
        total: 0,
      },
    ]);
  };

  const removeServico = (id: string) => {
    if (servicos.length > 1) {
      setServicos(servicos.filter((servico) => servico.id !== id));
    }
  };

  const updateServico = (
    id: string,
    field: keyof Servico,
    value: string | number
  ) => {
    setServicos(
      servicos.map((servico) => {
        if (servico.id === id) {
          const updated = { ...servico, [field]: value };
          if (field === "quantidade" || field === "precoUnitario") {
            updated.total = updated.quantidade * updated.precoUnitario;
          }
          return updated;
        }
        return servico;
      })
    );
  };

  const totalGeral = servicos.reduce((sum, servico) => sum + servico.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar se pelo menos um serviço tem descrição
    const servicosValidos = servicos.filter(
      (servico) => servico.descricao.trim() !== ""
    );

    if (servicosValidos.length === 0) {
      alert("Adicione pelo menos um serviço ou peça ao orçamento.");
      return;
    }

    // Converter serviços para o formato do banco de dados
    const servicosOrcamento: ServicoOrcamento[] = servicosValidos.map(
      (servico) => ({
        id: servico.id,
        descricao: servico.descricao,
        quantidade: servico.quantidade,
        precoUnitario: servico.precoUnitario,
        total: servico.total,
      })
    );

    try {
      // Criar o orçamento
      const novoOrcamento = createOrcamento({
        cliente: dadosOrcamento.cliente,
        telefone: dadosOrcamento.telefone || undefined,
        email: dadosOrcamento.email || undefined,
        veiculo: `${dadosOrcamento.marca || ""} ${
          dadosOrcamento.modelo || ""
        } ${dadosOrcamento.ano || ""} - ${dadosOrcamento.placa}`.trim(),
        placa: dadosOrcamento.placa,
        marca: dadosOrcamento.marca || undefined,
        modelo: dadosOrcamento.modelo || undefined,
        ano: dadosOrcamento.ano || undefined,
        observacoes: dadosOrcamento.observacoes || undefined,
        servicos: servicosOrcamento,
        status: "pendente",
        prazoGarantia: dadosOrcamento.prazoGarantia,
        dataValidade: dadosOrcamento.validadeOrcamento,
      });

      console.log("Orçamento criado com sucesso:", novoOrcamento);
      alert(`Orçamento ${novoOrcamento.numero} criado com sucesso!`);
      router.push("/orcamento");
    } catch (error) {
      console.error("Erro ao criar orçamento:", error);
      alert("Erro ao criar orçamento. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="mr-2"
          >
            <X className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Novo Orçamento</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados do Cliente */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Dados do Cliente e Veículo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Nome do Cliente *</Label>
                <Input
                  id="cliente"
                  placeholder="Nome completo"
                  value={dadosOrcamento.cliente}
                  onChange={(e) =>
                    setDadosOrcamento({
                      ...dadosOrcamento,
                      cliente: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  placeholder="(11) 99999-9999"
                  value={dadosOrcamento.telefone}
                  onChange={(e) =>
                    setDadosOrcamento({
                      ...dadosOrcamento,
                      telefone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="cliente@email.com"
                  value={dadosOrcamento.email}
                  onChange={(e) =>
                    setDadosOrcamento({
                      ...dadosOrcamento,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="placa">Placa do Veículo *</Label>
                <Input
                  id="placa"
                  placeholder="ABC-1234"
                  value={dadosOrcamento.placa}
                  onChange={(e) =>
                    setDadosOrcamento({
                      ...dadosOrcamento,
                      placa: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marca">Marca</Label>
                <Input
                  id="marca"
                  placeholder="Ex: Volkswagen"
                  value={dadosOrcamento.marca}
                  onChange={(e) =>
                    setDadosOrcamento({
                      ...dadosOrcamento,
                      marca: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input
                  id="modelo"
                  placeholder="Ex: Gol"
                  value={dadosOrcamento.modelo}
                  onChange={(e) =>
                    setDadosOrcamento({
                      ...dadosOrcamento,
                      modelo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ano">Ano</Label>
                <Input
                  id="ano"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  placeholder="2020"
                  value={dadosOrcamento.ano}
                  onChange={(e) =>
                    setDadosOrcamento({
                      ...dadosOrcamento,
                      ano: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Observações importantes sobre o veículo ou serviços..."
                rows={3}
                value={dadosOrcamento.observacoes}
                onChange={(e) =>
                  setDadosOrcamento({
                    ...dadosOrcamento,
                    observacoes: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Serviços */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Serviços e Peças</h2>
              <Button
                type="button"
                onClick={addServico}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Item
              </Button>
            </div>

            <div className="space-y-4">
              {servicos.map((servico, index) => (
                <div key={servico.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">Item {index + 1}</h3>
                    {servicos.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeServico(servico.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label>Descrição do Serviço/Peça *</Label>
                      <Input
                        placeholder="Ex: Troca de óleo, Pastilha de freio..."
                        value={servico.descricao}
                        onChange={(e) =>
                          updateServico(servico.id, "descricao", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantidade</Label>
                      <Input
                        type="number"
                        min="1"
                        value={servico.quantidade}
                        onChange={(e) =>
                          updateServico(
                            servico.id,
                            "quantidade",
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preço Unitário (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={servico.precoUnitario}
                        onChange={(e) =>
                          updateServico(
                            servico.id,
                            "precoUnitario",
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-2 text-right">
                    <span className="text-sm text-gray-500">
                      Subtotal:{" "}
                      <span className="font-medium">
                        R${" "}
                        {servico.total.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total do Orçamento:</span>
                <span className="text-green-600">
                  R${" "}
                  {totalGeral.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Configurações do Orçamento */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">
              Configurações do Orçamento
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prazoGarantia">Prazo de Garantia (dias)</Label>
                <Select
                  value={dadosOrcamento.prazoGarantia}
                  onValueChange={(value) =>
                    setDadosOrcamento({
                      ...dadosOrcamento,
                      prazoGarantia: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                    <SelectItem value="180">180 dias</SelectItem>
                    <SelectItem value="365">1 ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="validadeOrcamento">
                  Validade do Orçamento (dias)
                </Label>
                <Select
                  value={dadosOrcamento.validadeOrcamento}
                  onValueChange={(value) =>
                    setDadosOrcamento({
                      ...dadosOrcamento,
                      validadeOrcamento: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 dias</SelectItem>
                    <SelectItem value="7">7 dias</SelectItem>
                    <SelectItem value="10">10 dias</SelectItem>
                    <SelectItem value="15">15 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Salvar Orçamento
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
