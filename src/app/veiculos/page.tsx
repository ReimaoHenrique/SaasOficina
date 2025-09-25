"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Car, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Dados de exemplo - em um aplicativo real, isso viria de uma API
type Veiculo = {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  fotoUrl?: string;
  ultimoServico?: string;
};

export default function VeiculosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dados de exemplo
  const veiculos: Veiculo[] = [
    {
      id: "1",
      placa: "ABC-1234",
      marca: "Volkswagen",
      modelo: "Gol",
      ano: 2020,
      ultimoServico: "10/09/2023"
    },
    {
      id: "2",
      placa: "XYZ-5678",
      marca: "Fiat",
      modelo: "Uno",
      ano: 2019,
      ultimoServico: "05/09/2023"
    },
    {
      id: "3",
      placa: "DEF-9012",
      marca: "Chevrolet",
      modelo: "Onix",
      ano: 2021,
      ultimoServico: "01/09/2023"
    }
  ];

  const filteredVeiculos = veiculos.filter(veiculo => 
    Object.values(veiculo).some(
      value => value && 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Veículos</h1>
          <p className="text-gray-600">Gerencie os veículos da sua oficina</p>
        </div>
        <Link href="/veiculos/novo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Veículo
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar veículo por placa, marca, modelo..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredVeiculos.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border divide-y">
            {filteredVeiculos.map((veiculo) => (
              <Link 
                key={veiculo.id} 
                href={`/veiculos/${veiculo.id}`}
                className="block hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center p-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline">
                      <h3 className="font-medium">
                        {veiculo.marca} {veiculo.modelo}
                      </h3>
                      <span className="text-sm text-gray-500 sm:ml-2">
                        {veiculo.ano} • {veiculo.placa}
                      </span>
                    </div>
                    {veiculo.ultimoServico && (
                      <p className="text-sm text-gray-500 mt-1">
                        Último serviço: {veiculo.ultimoServico}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <Car className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum veículo encontrado</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm 
                ? "Nenhum veículo corresponde à sua busca." 
                : "Você ainda não cadastrou nenhum veículo."}
            </p>
            {!searchTerm && (
              <Link href="/veiculos/novo">
                <Button variant="outline" className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Veículo
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
