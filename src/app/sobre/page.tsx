import { Users, MapPin, Clock, Phone } from "lucide-react";
import Image from "next/image";

export default function SobrePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sobre a Oficina Pro</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transformando a gestão de oficinas mecânicas com tecnologia de ponta e atendimento excepcional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa História</h2>
            <p className="text-gray-600 mb-4">
              Fundada em 2023, a Oficina Pro nasceu da necessidade de modernizar a gestão de oficinas mecânicas, 
              trazendo mais eficiência e transparência para o dia a dia dos mecânicos e clientes.
            </p>
            <p className="text-gray-600 mb-6">
              Nossa missão é simplificar os processos de gestão, permitindo que os profissionais se concentrem no que 
              realmente importa: o cuidado com os veículos de seus clientes.
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">+100</h3>
                <p className="text-sm text-gray-600">Clientes satisfeitos</p>
              </div>
            </div>
          </div>
          <div className="relative h-80 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/workshop.jpg"
              alt="Oficina Mecânica"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="bg-primary/5 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Qualidade",
                description: "Comprometimento com a excelência em todos os serviços prestados."
              },
              {
                title: "Transparência",
                description: "Clareza e honestidade em todas as nossas relações."
              },
              {
                title: "Inovação",
                description: "Sempre buscando as melhores soluções para nossos clientes."
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Endereço</h3>
              <p className="text-gray-600">Rua Exemplo, 123<br />Bairro, Cidade - UF</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Horário de Funcionamento</h3>
              <p className="text-gray-600">Seg-Sex: 8h às 18h<br />Sáb: 8h às 12h</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Contato</h3>
              <p className="text-gray-600">
                <a href="tel:+5511999999999" className="hover:text-primary transition-colors">(11) 99999-9999</a>
                <br />
                <a href="mailto:contato@oficinapro.com" className="hover:text-primary transition-colors">contato@oficinapro.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
