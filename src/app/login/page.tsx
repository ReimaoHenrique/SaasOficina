"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, User, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    id: "",
    senha: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Limpar erro quando usuário começar a digitar
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id.trim()) {
      setError("Por favor, informe seu ID.");
      return;
    }

    if (!formData.senha.trim()) {
      setError("Por favor, informe sua senha.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const success = await login(formData.id, formData.senha);

      if (success) {
        // Redirecionar para a página principal após login bem-sucedido
        router.push("/");
      } else {
        setError("ID ou senha incorretos. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Erro ao fazer login. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao site
          </Link>
          <div className="bg-white p-4 rounded-full shadow-lg inline-block mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Área Restrita</h1>
          <p className="text-gray-600 mt-2">
            Faça login para acessar o painel administrativo
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="id">ID do Usuário</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="id"
                    type="text"
                    placeholder="Digite seu ID"
                    className="pl-10"
                    value={formData.id}
                    onChange={(e) => handleInputChange("id", e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="pl-10 pr-10"
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Informações de exemplo */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700 font-medium mb-1">
                  💡 Dados de exemplo para teste:
                </p>
                <div className="text-xs text-blue-600 space-y-1">
                  <p>
                    <strong>ID:</strong> c3f5e5f7-4b3f-4e7e-8c6a-1d5b3a9c8e4a
                  </p>
                  <p>
                    <strong>Senha:</strong> gutopassword
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Entrando...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Entrar
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Esqueceu suas credenciais? Entre em contato com o
                  administrador.
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Informações adicionais */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Acesso restrito apenas para funcionários autorizados
          </p>
        </div>
      </div>
    </div>
  );
}
