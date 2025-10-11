export type TipoServico =
  | "revisao"
  | "reparo"
  | "manutencao"
  | "troca_pecas"
  | "diagnostico"
  | "outros";

export type UrgenciaServico = "baixa" | "media" | "alta" | "emergencia";

export type StatusSolicitacao =
  | "pendente"
  | "em_analise"
  | "orcamento_enviado"
  | "aceito"
  | "rejeitado";

export type SolicitacaoOrcamento = {
  id: string;
  numero: string;
  // Dados do cliente
  cliente: string;
  telefone: string;
  email?: string;
  endereco?: string;

  // Dados do veículo
  veiculo: string;
  placa: string;
  marca?: string;
  modelo?: string;
  ano?: string;
  quilometragem?: string;

  // Detalhes do serviço
  tipoServico: TipoServico;
  urgencia: UrgenciaServico;
  descricaoProblema: string;
  sintomas?: string;
  servicosDesejados?: string;
  observacoes?: string;

  // Preferências
  preferenciaContato: "telefone" | "email" | "whatsapp";
  disponibilidade?: string;
  orcamentoPresencial: boolean;

  // Metadados
  status: StatusSolicitacao;
  dataCriacao: string;
  dataAnalise?: string;
  observacoesInternas?: string;
};

// Dados de exemplo - em um aplicativo real, isso viria de uma API ou banco de dados
const solicitacoes: SolicitacaoOrcamento[] = [
  {
    id: "1",
    numero: "SOL-2024-001",
    cliente: "Carlos Eduardo",
    telefone: "(11) 99999-8888",
    email: "carlos.eduardo@email.com",
    endereco: "Rua das Flores, 123 - São Paulo/SP",
    veiculo: "Honda Civic 2018",
    placa: "HON-1234",
    marca: "Honda",
    modelo: "Civic",
    ano: "2018",
    quilometragem: "85000",
    tipoServico: "revisao",
    urgencia: "media",
    descricaoProblema:
      "Veículo com barulho estranho na suspensão dianteira e luz do painel acesa",
    sintomas: "Barulho de batida quando passo em buracos, luz do ABS piscando",
    servicosDesejados: "Verificação completa da suspensão e sistema de freios",
    observacoes: "Preferência para manhãs, veículo usado diariamente",
    preferenciaContato: "whatsapp",
    disponibilidade: "Segunda a sexta, 8h às 17h",
    orcamentoPresencial: true,
    status: "pendente",
    dataCriacao: "15/09/2024",
  },
  {
    id: "2",
    numero: "SOL-2024-002",
    cliente: "Ana Maria Silva",
    telefone: "(11) 88888-7777",
    email: "ana.silva@email.com",
    veiculo: "Volkswagen Polo 2020",
    placa: "POL-5678",
    marca: "Volkswagen",
    modelo: "Polo",
    ano: "2020",
    quilometragem: "45000",
    tipoServico: "manutencao",
    urgencia: "baixa",
    descricaoProblema: "Revisão periódica dos 45.000 km",
    servicosDesejados: "Troca de óleo, filtros e verificação geral",
    preferenciaContato: "telefone",
    orcamentoPresencial: false,
    status: "orcamento_enviado",
    dataCriacao: "12/09/2024",
    dataAnalise: "13/09/2024",
  },
];

// Funções para gerenciar solicitações
export const getSolicitacoes = (): SolicitacaoOrcamento[] => {
  return [...solicitacoes];
};

export const getSolicitacaoById = (
  id: string
): SolicitacaoOrcamento | undefined => {
  return solicitacoes.find((solicitacao) => solicitacao.id === id);
};

export const createSolicitacao = (
  novaSolicitacao: Omit<SolicitacaoOrcamento, "id" | "numero" | "dataCriacao">
): SolicitacaoOrcamento => {
  // Gerar ID único
  const novoId = (solicitacoes.length + 1).toString();

  // Gerar número da solicitação
  const anoAtual = new Date().getFullYear();
  const numero = `SOL-${anoAtual}-${novoId.padStart(3, "0")}`;

  // Data de criação
  const dataCriacao = new Date().toLocaleDateString("pt-BR");

  const solicitacaoCompleta: SolicitacaoOrcamento = {
    ...novaSolicitacao,
    id: novoId,
    numero,
    dataCriacao,
  };

  solicitacoes.push(solicitacaoCompleta);
  return solicitacaoCompleta;
};

export const updateSolicitacao = (
  id: string,
  updates: Partial<SolicitacaoOrcamento>
): SolicitacaoOrcamento | null => {
  const index = solicitacoes.findIndex((solicitacao) => solicitacao.id === id);

  if (index === -1) {
    return null;
  }

  solicitacoes[index] = { ...solicitacoes[index], ...updates };
  return solicitacoes[index];
};

export const deleteSolicitacao = (id: string): boolean => {
  const index = solicitacoes.findIndex((solicitacao) => solicitacao.id === id);

  if (index === -1) {
    return false;
  }

  solicitacoes.splice(index, 1);
  return true;
};

export const getSolicitacoesByStatus = (
  status: StatusSolicitacao
): SolicitacaoOrcamento[] => {
  return solicitacoes.filter((solicitacao) => solicitacao.status === status);
};

export const getTipoServicoText = (tipo: TipoServico): string => {
  switch (tipo) {
    case "revisao":
      return "Revisão Periódica";
    case "reparo":
      return "Reparo/Conserto";
    case "manutencao":
      return "Manutenção";
    case "troca_pecas":
      return "Troca de Peças";
    case "diagnostico":
      return "Diagnóstico";
    case "outros":
      return "Outros";
    default:
      return tipo;
  }
};

export const getUrgenciaText = (urgencia: UrgenciaServico): string => {
  switch (urgencia) {
    case "baixa":
      return "Baixa";
    case "media":
      return "Média";
    case "alta":
      return "Alta";
    case "emergencia":
      return "Emergência";
    default:
      return urgencia;
  }
};

export const getUrgenciaColor = (urgencia: UrgenciaServico): string => {
  switch (urgencia) {
    case "baixa":
      return "bg-green-100 text-green-800 border-green-200";
    case "media":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "alta":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "emergencia":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusText = (status: StatusSolicitacao): string => {
  switch (status) {
    case "pendente":
      return "Pendente";
    case "em_analise":
      return "Em Análise";
    case "orcamento_enviado":
      return "Orçamento Enviado";
    case "aceito":
      return "Aceito";
    case "rejeitado":
      return "Rejeitado";
    default:
      return status;
  }
};

export const getStatusColor = (status: StatusSolicitacao): string => {
  switch (status) {
    case "pendente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "em_analise":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "orcamento_enviado":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "aceito":
      return "bg-green-100 text-green-800 border-green-200";
    case "rejeitado":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
