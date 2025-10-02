export interface Foto {
  id: string;
  url: string;
  tipo: "antes" | "depois" | "durante";
  descricao: string;
  data: string;
}

export interface Servico {
  ordensServico: string;
  veiculo: string;
  placa: string;
  descricao: string;
  dataEntrada: string;
  dataSaida?: string;
  previsaoEntrega?: string;
  status: "pendente" | "em_andamento" | "concluido" | "aguardando_pecas";
  prioridade: "baixa" | "media" | "alta";
  valor?: number;
  observacoes?: string;
  fotos: Foto[];
}

export interface Veiculo {
  id: string;
  veiculo: string;
  placa: string;
  servicos: Servico[];
}

export interface ServicoSimplificado {
  servico: string;
  dataEntrada: string;
  dataSaida?: string;
  previsaoEntrega?: string;
  status: "pendente" | "em_andamento" | "concluido" | "aguardando_pecas";
  prioridade: "baixa" | "media" | "alta";
  valor: number;
  observacoes?: string;
  fotos: Foto[];
}

// Dados de veículos (compatibilidade com código existente)
export const veiculosData: Veiculo[] = [
  {
    id: "ABC-1234",
    veiculo: "Volkswagen Gol",
    placa: "ABC-1234",
    servicos: [
      {
        ordensServico: "Troca de óleo ",
        veiculo: "Volkswagen Gol",
        placa: "ABC-1234",
        descricao: "Troca de óleo e filtros",
        dataEntrada: "10/09/2023",
        dataSaida: "12/09/2023",
        previsaoEntrega: "12/09/2023",
        status: "concluido",
        prioridade: "baixa",
        valor: 150.0,
        observacoes: "Cliente solicitou troca de óleo",
        fotos: [],
      },
      {
        ordensServico: "Troca de óleo e filtros",
        veiculo: "Volkswagen Gol",
        placa: "ABC-1234",
        descricao: "Troca de óleo e filtros",
        dataEntrada: "10/09/2023",
        dataSaida: "12/09/2023",
        previsaoEntrega: "12/09/2023",
        status: "concluido",
        prioridade: "baixa",
        valor: 150.0,
        observacoes: "Cliente solicitou troca de óleo",
        fotos: [],
      },
    ],
  },

  {
    id: "XYZ-5678",
    veiculo: "Fiat Uno",
    placa: "XYZ-5678",
    servicos: [
      {
        ordensServico: "Revisão completa",
        veiculo: "Fiat Uno",
        placa: "XYZ-5678",
        descricao: "Revisão completa",
        dataEntrada: "15/09/2023",
        status: "em_andamento",
        prioridade: "media",
        valor: 450.0,
        observacoes: "Revisão dos 40.000 km",
        fotos: [
          {
            id: "3",
            url: "/service-photos/xyz5678-antes-1.jpg",
            tipo: "antes",
            descricao: "Veículo antes da revisão",
            data: "15/09/2023 09:15",
          },
          {
            id: "d4",
            url: "/service-photos/xyz5678-durante-1.jpg",
            tipo: "durante",
            descricao: "Troca de correia dentada",
            data: "15/09/2023 14:20",
          },
        ],
      },
    ],
  },
  {
    id: "DEF-9012",
    veiculo: "Chevrolet Onix",
    placa: "DEF-9012",
    servicos: [
      {
        ordensServico: "Revisão completa",
        veiculo: "Chevrolet Onix",
        placa: "DEF-9012",
        descricao: "Revisão completa",
        dataEntrada: "15/09/2023",
        status: "em_andamento",
        prioridade: "media",
        valor: 450.0,
        observacoes: "Revisão dos 40.000 km",
        fotos: [
          {
            id: "3",
            url: "/service-photos/xyz5678-antes-1.jpg",
            tipo: "antes",
            descricao: "Veículo antes da revisão",
            data: "15/09/2023 09:15",
          },
          {
            id: "d4",
            url: "/service-photos/xyz5678-durante-1.jpg",
            tipo: "durante",
            descricao: "Troca de correia dentada",
            data: "15/09/2023 14:20",
          },
        ],
      },
    ],
  },
  {
    id: "DEF-9012",
    veiculo: "Chevrolet Onix",
    placa: "DEF-9012",
    servicos: [
      {
        ordensServico: "Troca de pastilhas de freio",
        veiculo: "Chevrolet Onix",
        placa: "DEF-9012",
        descricao: "Troca de pastilhas de freio",
        dataEntrada: "20/09/2023",
        status: "aguardando_pecas",
        prioridade: "alta",
        valor: 320.0,
        observacoes: "Pastilhas dianteiras e traseiras",
        fotos: [
          {
            id: "DDD4D56",
            url: "/service-photos/def9012-antes-1.jpg",
            tipo: "antes",
            descricao: "Freios antes da troca",
            data: "20/09/2023 10:00",
          },
          {
            id: "EEE5E67",
            url: "/service-photos/def9012-antes-2.jpg",
            tipo: "antes",
            descricao: "Disco de freio desgastado",
            data: "20/09/2023 10:15",
          },
        ],
      },
      {
        ordensServico: "Troca de óleo do motor",
        veiculo: "Chevrolet Onix",
        placa: "DEF-9012",
        descricao: "Troca de óleo do motor",
        dataEntrada: "25/09/2023",
        status: "concluido",
        prioridade: "baixa",
        valor: 120.0,
        observacoes: "Óleo 5W30 sintético",
        fotos: [],
      },
    ],
  },
  {
    id: "GHI-3456",
    veiculo: "Hyundai HB20",
    placa: "GHI-3456",
    servicos: [
      {
        ordensServico: "Alinhamento e balanceamento",
        veiculo: "Hyundai HB20",
        placa: "GHI-3456",
        descricao: "Alinhamento e balanceamento",
        dataEntrada: "22/09/2023",
        status: "pendente",
        prioridade: "media",
        valor: 80.0,
        observacoes: "Cliente relatou vibração no volante",
        fotos: [
          {
            id: "7",
            url: "/service-photos/ghi3456-antes-1.jpg",
            tipo: "antes",
            descricao: "Pneus antes do alinhamento",
            data: "22/09/2023 11:30",
          },
        ],
      },
    ],
  },
];

// Dados de serviços (compatibilidade com código existente)
export const servicosData: Servico[] = veiculosData.flatMap((veiculo) =>
  veiculo.servicos.map((servico) => ({
    ...servico,
    veiculo: veiculo.veiculo,
    placa: veiculo.placa,
  }))
);

// Função para gerar slug baseado nos dados do serviço
export function generateSlug(servico: Servico): string {
  const placa = servico.placa.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const status = servico.status.replace(/_/g, "-");
  const descricaoSlug = servico.descricao
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50);

  const fotosAntes = servico.fotos.filter((f) => f.tipo === "antes").length;
  const fotosDepois = servico.fotos.filter((f) => f.tipo === "depois").length;

  return `${placa}-${status}-${fotosAntes}antes-${fotosDepois}depois-${descricaoSlug}`;
}

// Função para buscar um serviço por ordensServico
export function getServicoByOrdensServico(
  ordensServico: string
): Servico | undefined {
  return servicosData.find(
    (servico) => servico.ordensServico === ordensServico
  );
}

// Função para buscar serviços por placa
export function getServicosByPlaca(placa: string): Servico[] {
  return servicosData.filter((servico) =>
    servico.placa.toLowerCase().includes(placa.toLowerCase())
  );
}

// Função para buscar serviços por status
export function getServicosByStatus(status: Servico["status"]): Servico[] {
  return servicosData.filter((servico) => servico.status === status);
}

// Função para buscar um veículo por ID
export function getVeiculoById(id: string): Veiculo | undefined {
  return veiculosData.find((veiculo) => veiculo.id === id);
}

// Função para buscar serviços de um veículo específico
export function getServicosByVeiculoId(veiculoId: string): Servico[] {
  const veiculo = veiculosData.find((v) => v.id === veiculoId);
  if (!veiculo) return [];

  return veiculo.servicos.map((servico) => ({
    ...servico,
    veiculo: veiculo.veiculo,
    placa: veiculo.placa,
  }));
}

// Função para adicionar um novo serviço a um veículo
export function addServicoToVeiculo(
  veiculoPlaca: string,
  novoServico: Omit<Servico, "ordensServico" | "veiculo" | "placa">
): Veiculo | null {
  const veiculo = veiculosData.find((v) => v.placa === veiculoPlaca);
  if (!veiculo) return null;

  const servico: Servico = {
    ...novoServico,
    ordensServico: `ordensServico-${(servicosData.length + 1)
      .toString()
      .padStart(3, "0")}`,
    veiculo: veiculo.veiculo,
    placa: veiculo.placa,
  };

  servicosData.push(servico);
  veiculo.servicos.push(servico);
  return veiculo;
}
