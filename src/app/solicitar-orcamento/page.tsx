"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  Send,
  Car,
  User,
  Wrench,
  MessageSquare,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  createSolicitacao,
  type TipoServico,
  type UrgenciaServico,
} from "@/data/solicitacao-orcamento";

export default function SolicitarOrcamentoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [numeroSolicitacao, setNumeroSolicitacao] = useState("");

  const [formData, setFormData] = useState({
    // Dados do cliente
    cliente: "",
    telefone: "",
    email: "",
    endereco: "",

    // Dados do veículo
    veiculo: "",
    placa: "",
    marca: "",
    modelo: "",
    ano: "",
    quilometragem: "",

    // Detalhes do serviço
    tipoServico: "" as TipoServico | "",
    urgencia: "media" as UrgenciaServico,
    descricaoProblema: "",
    sintomas: "",
    servicosDesejados: "",
    observacoes: "",

    // Preferências
    preferenciaContato: "telefone" as "telefone" | "email" | "whatsapp",
    disponibilidade: "",
    orcamentoPresencial: true,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações básicas
    if (!formData.cliente.trim()) {
      alert("Por favor, informe seu nome.");
      return;
    }

    if (!formData.telefone.trim()) {
      alert("Por favor, informe seu telefone.");
      return;
    }

    if (!formData.placa.trim()) {
      alert("Por favor, informe a placa do veículo.");
      return;
    }

    if (!formData.descricaoProblema.trim()) {
      alert("Por favor, descreva o problema ou serviço desejado.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular delay de processamento
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Criar solicitação
      const novaSolicitacao = createSolicitacao({
        cliente: formData.cliente,
        telefone: formData.telefone,
        email: formData.email || undefined,
        endereco: formData.endereco || undefined,
        veiculo:
          formData.veiculo ||
          `${formData.marca} ${formData.modelo} ${formData.ano}`.trim(),
        placa: formData.placa,
        marca: formData.marca || undefined,
        modelo: formData.modelo || undefined,
        ano: formData.ano || undefined,
        quilometragem: formData.quilometragem || undefined,
        tipoServico: (formData.tipoServico as TipoServico) || "outros",
        urgencia: formData.urgencia,
        descricaoProblema: formData.descricaoProblema,
        sintomas: formData.sintomas || undefined,
        servicosDesejados: formData.servicosDesejados || undefined,
        observacoes: formData.observacoes || undefined,
        preferenciaContato: formData.preferenciaContato,
        disponibilidade: formData.disponibilidade || undefined,
        orcamentoPresencial: formData.orcamentoPresencial,
        status: "pendente",
      });

      setNumeroSolicitacao(novaSolicitacao.numero);
      setIsSubmitted(true);

      console.log("Solicitação criada:", novaSolicitacao);
    } catch (error) {
      console.error("Erro ao criar solicitação:", error);
      alert("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Solicitação Enviada!
                </h2>
                <p className="text-gray-600 mb-4">
                  Sua solicitação de orçamento foi enviada com sucesso.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-800 font-medium">
                    Número da Solicitação:
                  </p>
                  <p className="text-lg font-bold text-blue-900">
                    {numeroSolicitacao}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <p>📞 Entraremos em contato em até 24 horas</p>
                <p>📋 Analisaremos seu caso e prepararemos um orçamento</p>
                <p>✅ Você receberá uma proposta detalhada</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Início
                </Button>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      cliente: "",
                      telefone: "",
                      email: "",
                      endereco: "",
                      veiculo: "",
                      placa: "",
                      marca: "",
                      modelo: "",
                      ano: "",
                      quilometragem: "",
                      tipoServico: "",
                      urgencia: "media",
                      descricaoProblema: "",
                      sintomas: "",
                      servicosDesejados: "",
                      observacoes: "",
                      preferenciaContato: "telefone",
                      disponibilidade: "",
                      orcamentoPresencial: true,
                    });
                  }}
                  className="flex-1"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Nova Solicitação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-white p-4 rounded-full shadow-lg">
                <Calculator className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Solicitar Orçamento
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Preencha o formulário abaixo e receba um orçamento personalizado
              para o seu veículo. Nossa equipe entrará em contato em até 24
              horas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados do Cliente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Seus Dados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cliente">Nome Completo *</Label>
                    <Input
                      id="cliente"
                      placeholder="Seu nome completo"
                      value={formData.cliente}
                      onChange={(e) =>
                        handleInputChange("cliente", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) =>
                        handleInputChange("telefone", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      placeholder="Rua, número, bairro, cidade"
                      value={formData.endereco}
                      onChange={(e) =>
                        handleInputChange("endereco", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dados do Veículo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  Dados do Veículo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="placa">Placa do Veículo *</Label>
                    <Input
                      id="placa"
                      placeholder="ABC-1234"
                      value={formData.placa}
                      onChange={(e) =>
                        handleInputChange("placa", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marca">Marca</Label>
                    <Input
                      id="marca"
                      placeholder="Ex: Volkswagen"
                      value={formData.marca}
                      onChange={(e) =>
                        handleInputChange("marca", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modelo">Modelo</Label>
                    <Input
                      id="modelo"
                      placeholder="Ex: Gol"
                      value={formData.modelo}
                      onChange={(e) =>
                        handleInputChange("modelo", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ano">Ano</Label>
                    <Input
                      id="ano"
                      placeholder="2020"
                      value={formData.ano}
                      onChange={(e) => handleInputChange("ano", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quilometragem">Quilometragem</Label>
                    <Input
                      id="quilometragem"
                      placeholder="50000"
                      value={formData.quilometragem}
                      onChange={(e) =>
                        handleInputChange("quilometragem", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detalhes do Serviço */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  Detalhes do Serviço
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipoServico">Tipo de Serviço</Label>
                    <Select
                      value={formData.tipoServico}
                      onValueChange={(value) =>
                        handleInputChange("tipoServico", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revisao">
                          Revisão Periódica
                        </SelectItem>
                        <SelectItem value="reparo">Reparo/Conserto</SelectItem>
                        <SelectItem value="manutencao">Manutenção</SelectItem>
                        <SelectItem value="troca_pecas">
                          Troca de Peças
                        </SelectItem>
                        <SelectItem value="diagnostico">Diagnóstico</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgencia">Urgência</Label>
                    <Select
                      value={formData.urgencia}
                      onValueChange={(value) =>
                        handleInputChange("urgencia", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="emergencia">Emergência</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricaoProblema">
                    Descrição do Problema/Serviço *
                  </Label>
                  <Textarea
                    id="descricaoProblema"
                    placeholder="Descreva detalhadamente o problema ou serviço que precisa..."
                    rows={3}
                    value={formData.descricaoProblema}
                    onChange={(e) =>
                      handleInputChange("descricaoProblema", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sintomas">Sintomas/Comportamentos</Label>
                  <Textarea
                    id="sintomas"
                    placeholder="Ex: Barulhos, luzes acesas, dificuldades para ligar..."
                    rows={2}
                    value={formData.sintomas}
                    onChange={(e) =>
                      handleInputChange("sintomas", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servicosDesejados">Serviços Desejados</Label>
                  <Textarea
                    id="servicosDesejados"
                    placeholder="Ex: Troca de óleo, verificação de freios, alinhamento..."
                    rows={2}
                    value={formData.servicosDesejados}
                    onChange={(e) =>
                      handleInputChange("servicosDesejados", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferências */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Preferências de Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferenciaContato">
                      Preferência de Contato
                    </Label>
                    <Select
                      value={formData.preferenciaContato}
                      onValueChange={(value) =>
                        handleInputChange("preferenciaContato", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="telefone">Telefone</SelectItem>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disponibilidade">Disponibilidade</Label>
                    <Input
                      id="disponibilidade"
                      placeholder="Ex: Segunda a sexta, 8h às 17h"
                      value={formData.disponibilidade}
                      onChange={(e) =>
                        handleInputChange("disponibilidade", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="orcamentoPresencial"
                    checked={formData.orcamentoPresencial}
                    onCheckedChange={(checked) =>
                      handleInputChange(
                        "orcamentoPresencial",
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor="orcamentoPresencial">
                    Aceito receber um orçamento presencial (mais preciso)
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações Adicionais</Label>
                  <Textarea
                    id="observacoes"
                    placeholder="Alguma informação adicional que possa ser útil..."
                    rows={2}
                    value={formData.observacoes}
                    onChange={(e) =>
                      handleInputChange("observacoes", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Botão de Envio */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="gap-2 px-8"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar Solicitação
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-500 mt-3">
                Ao enviar, você concorda em receber contato da nossa equipe para
                análise do seu caso e elaboração do orçamento.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
