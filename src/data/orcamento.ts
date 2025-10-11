export type StatusOrcamento =
  | "pendente"
  | "aprovado"
  | "rejeitado"
  | "concluido";

export type ServicoOrcamento = {
  id: string;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  total: number;
};

export type Orcamento = {
  id: string;
  numero: string;
  cliente: string;
  telefone?: string;
  email?: string;
  veiculo: string;
  placa: string;
  marca?: string;
  modelo?: string;
  ano?: string;
  observacoes?: string;
  servicos: ServicoOrcamento[];
  total: number;
  status: StatusOrcamento;
  dataCriacao: string;
  dataValidade?: string;
  prazoGarantia: string;
};

// Dados de exemplo - em um aplicativo real, isso viria de uma API ou banco de dados
const orcamentos: Orcamento[] = [
  {
    id: "1",
    numero: "ORC-2024-001",
    cliente: "João Silva",
    telefone: "(11) 99999-9999",
    email: "joao.silva@email.com",
    veiculo: "Volkswagen Gol 2020 - ABC-1234",
    placa: "ABC-1234",
    marca: "Volkswagen",
    modelo: "Gol",
    ano: "2020",
    observacoes: "Veículo com barulho na suspensão dianteira",
    servicos: [
      {
        id: "s1",
        descricao: "Troca de óleo do motor",
        quantidade: 1,
        precoUnitario: 45.0,
        total: 45.0,
      },
      {
        id: "s2",
        descricao: "Filtro de óleo",
        quantidade: 1,
        precoUnitario: 25.5,
        total: 25.5,
      },
      {
        id: "s3",
        descricao: "Mão de obra - troca de óleo",
        quantidade: 1,
        precoUnitario: 30.0,
        total: 30.0,
      },
    ],
    total: 100.5,
    status: "pendente",
    dataCriacao: "10/09/2024",
    dataValidade: "20/09/2024",
    prazoGarantia: "90",
  },
  {
    id: "2",
    numero: "ORC-2024-002",
    cliente: "Maria Santos",
    telefone: "(11) 88888-8888",
    email: "maria.santos@email.com",
    veiculo: "Fiat Uno 2019 - XYZ-5678",
    placa: "XYZ-5678",
    marca: "Fiat",
    modelo: "Uno",
    ano: "2019",
    observacoes: "Revisão completa do veículo",
    servicos: [
      {
        id: "s4",
        descricao: "Pastilhas de freio dianteiras",
        quantidade: 2,
        precoUnitario: 120.0,
        total: 240.0,
      },
      {
        id: "s5",
        descricao: "Discos de freio dianteiros",
        quantidade: 2,
        precoUnitario: 180.0,
        total: 360.0,
      },
      {
        id: "s6",
        descricao: "Mão de obra - troca de freios",
        quantidade: 1,
        precoUnitario: 150.0,
        total: 150.0,
      },
      {
        id: "s7",
        descricao: "Fluido de freio",
        quantidade: 1,
        precoUnitario: 25.0,
        total: 25.0,
      },
    ],
    total: 775.0,
    status: "aprovado",
    dataCriacao: "08/09/2024",
    dataValidade: "18/09/2024",
    prazoGarantia: "180",
  },
  {
    id: "3",
    numero: "ORC-2024-003",
    cliente: "Pedro Costa",
    telefone: "(11) 77777-7777",
    veiculo: "Chevrolet Onix 2021 - DEF-9012",
    placa: "DEF-9012",
    marca: "Chevrolet",
    modelo: "Onix",
    ano: "2021",
    observacoes: "Manutenção preventiva",
    servicos: [
      {
        id: "s8",
        descricao: "Troca de filtro de ar",
        quantidade: 1,
        precoUnitario: 35.0,
        total: 35.0,
      },
      {
        id: "s9",
        descricao: "Troca de filtro de combustível",
        quantidade: 1,
        precoUnitario: 45.0,
        total: 45.0,
      },
      {
        id: "s10",
        descricao: "Mão de obra - troca de filtros",
        quantidade: 1,
        precoUnitario: 40.0,
        total: 40.0,
      },
    ],
    total: 120.0,
    status: "concluido",
    dataCriacao: "05/09/2024",
    prazoGarantia: "90",
  },
];

// Funções para gerenciar orçamentos
export const getOrcamentos = (): Orcamento[] => {
  return [...orcamentos];
};

export const getOrcamentoById = (id: string): Orcamento | undefined => {
  return orcamentos.find((orcamento) => orcamento.id === id);
};

export const createOrcamento = (
  novoOrcamento: Omit<Orcamento, "id" | "numero" | "total" | "dataCriacao">
): Orcamento => {
  // Gerar ID único
  const novoId = (orcamentos.length + 1).toString();

  // Gerar número do orçamento
  const anoAtual = new Date().getFullYear();
  const numero = `ORC-${anoAtual}-${novoId.padStart(3, "0")}`;

  // Calcular total dos serviços
  const total = novoOrcamento.servicos.reduce(
    (sum, servico) => sum + servico.total,
    0
  );

  // Data de criação
  const dataCriacao = new Date().toLocaleDateString("pt-BR");

  // Data de validade se especificada
  let dataValidade;
  if (novoOrcamento.dataValidade) {
    const validadeDias = parseInt(novoOrcamento.dataValidade);
    const dataValidadeObj = new Date();
    dataValidadeObj.setDate(dataValidadeObj.getDate() + validadeDias);
    dataValidade = dataValidadeObj.toLocaleDateString("pt-BR");
  }

  const orcamentoCompleto: Orcamento = {
    ...novoOrcamento,
    id: novoId,
    numero,
    total,
    dataCriacao,
    dataValidade,
  };

  orcamentos.push(orcamentoCompleto);
  return orcamentoCompleto;
};

export const updateOrcamento = (
  id: string,
  updates: Partial<Orcamento>
): Orcamento | null => {
  const index = orcamentos.findIndex((orcamento) => orcamento.id === id);

  if (index === -1) {
    return null;
  }

  // Recalcular total se serviços foram atualizados
  if (updates.servicos) {
    updates.total = updates.servicos.reduce(
      (sum, servico) => sum + servico.total,
      0
    );
  }

  orcamentos[index] = { ...orcamentos[index], ...updates };
  return orcamentos[index];
};

export const deleteOrcamento = (id: string): boolean => {
  const index = orcamentos.findIndex((orcamento) => orcamento.id === id);

  if (index === -1) {
    return false;
  }

  orcamentos.splice(index, 1);
  return true;
};

export const getOrcamentosByStatus = (status: StatusOrcamento): Orcamento[] => {
  return orcamentos.filter((orcamento) => orcamento.status === status);
};

export const searchOrcamentos = (term: string): Orcamento[] => {
  const termLower = term.toLowerCase();
  return orcamentos.filter(
    (orcamento) =>
      orcamento.numero.toLowerCase().includes(termLower) ||
      orcamento.cliente.toLowerCase().includes(termLower) ||
      orcamento.veiculo.toLowerCase().includes(termLower) ||
      orcamento.placa.toLowerCase().includes(termLower)
  );
};
