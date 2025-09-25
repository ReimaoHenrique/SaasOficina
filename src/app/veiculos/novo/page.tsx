"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Save, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera as CameraComponent } from "@/components/ui/camera";

export default function NovoVeiculo() {
  const router = useRouter();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  
  const handleCapture = (imageData: string) => {
    setPhotos(prev => [...prev, imageData]);
    setIsCameraOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar o veículo
    console.log("Veículo salvo com fotos:", photos);
    router.push("/veiculos");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <X className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Novo Veículo</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="placa">Placa</Label>
                <Input id="placa" placeholder="ABC-1234" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marca">Marca</Label>
                <Input id="marca" placeholder="Ex: Volkswagen" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modelo">Modelo</Label>
                <Input id="modelo" placeholder="Ex: Gol" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ano">Ano</Label>
                <Input id="ano" type="number" min="1900" max={new Date().getFullYear() + 1} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea id="observacoes" placeholder="Alguma observação importante sobre o veículo..." rows={3} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Fotos do Veículo</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsCameraOpen(true)}
              >
                <Camera className="h-4 w-4 mr-2" />
                Adicionar Foto
              </Button>
            </div>
            
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="relative w-full h-32">
                      <Image 
                        src={photo} 
                        alt={`Foto ${index + 1} do veículo`}
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Nenhuma foto adicionada ainda</p>
                <Button
                  type="button"
                  variant="link"
                  className="mt-2"
                  onClick={() => setIsCameraOpen(true)}
                >
                  Tirar a primeira foto
                </Button>
              </div>
            )}
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
              Salvar Veículo
            </Button>
          </div>
        </form>
      </div>

      {isCameraOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Tirar Foto</h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsCameraOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <CameraComponent onCapture={handleCapture} />
            </div>
            <p className="mt-2 text-sm text-gray-300 text-center">
              Posicione o veículo na área destacada e tire a foto
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
