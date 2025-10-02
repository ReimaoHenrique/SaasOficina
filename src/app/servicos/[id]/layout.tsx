import { Metadata } from "next";
import { getVeiculoById, getServicosByVeiculoId, type Veiculo, type Servico } from "@/data/service";

interface LayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const veiculo: Veiculo | undefined = getVeiculoById(params.id);

  if (!veiculo) {
    return {
      title: "Veículo não encontrado - SaaS Oficina",
      description: "O veículo solicitado não foi encontrado em nosso sistema.",
    };
  }

  const servicos: Servico[] = getServicosByVeiculoId(params.id);
  const primeiroServico: Servico | undefined = servicos[0];
  const primeiraFoto = primeiroServico?.fotos.find(foto => foto.tipo === "antes") || primeiroServico?.fotos[0];

  // Determinar status do veículo baseado nos serviços
  const statusServicos = servicos.map((s: Servico) => s.status);
  let statusVeiculo = "Serviços Realizados";
  let statusColor = "#6b7280";

  if (statusServicos.includes("em_andamento")) {
    statusVeiculo = "Em Andamento";
    statusColor = "#3b82f6";
  } else if (statusServicos.includes("pendente")) {
    statusVeiculo = "Pendente";
    statusColor = "#eab308";
  } else if (statusServicos.includes("aguardando_pecas")) {
    statusVeiculo = "Aguardando Peças";
    statusColor = "#ef4444";
  } else if (statusServicos.every((s: Servico["status"]) => s === "concluido")) {
    statusVeiculo = "Concluído";
    statusColor = "#22c55e";
  }

  const titulo = `${veiculo.veiculo} - ${statusVeiculo} | SaaS Oficina`;
  const descricao = `Veículo: ${veiculo.veiculo} (${veiculo.placa})
Serviços: ${servicos.length} realizado${servicos.length > 1 ? 's' : ''}
Status: ${statusVeiculo}
${primeiroServico ? `Último serviço: ${primeiroServico.descricao}` : ''}`;

  return {
    title: titulo,
    description: descricao,
    openGraph: {
      title: titulo,
      description: descricao,
      url: `https://saasoficina.vercel.app/servicos/${params.id}`,
      siteName: 'SaaS Oficina',
      images: primeiraFoto ? [
        {
          url: primeiraFoto.url.startsWith('/') ? primeiraFoto.url : `/${primeiraFoto.url}`,
          width: 1200,
          height: 630,
          alt: primeiraFoto.descricao || `${veiculo.veiculo} - Serviço da oficina`,
        },
      ] : [],
      type: 'website',
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: descricao,
      images: primeiraFoto ? [primeiraFoto.url.startsWith('/') ? primeiraFoto.url : `/${primeiraFoto.url}`] : [],
    },
    other: {
      'theme-color': statusColor,
    },
  };
}

export default function Layout({ children, params }: LayoutProps) {
  console.log('Vehicle ID:', params.id);
  return (
    <>
      {children}
    </>
  );
}
