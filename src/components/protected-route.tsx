"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirecionar para login se não estiver autenticado
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar fallback ou página de acesso negado
  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Acesso Restrito
            </h2>
            <p className="text-gray-600 mb-4">
              Esta área é restrita apenas para usuários autenticados.
            </p>
            <div className="space-y-2">
              <Button onClick={() => router.push("/login")} className="w-full">
                Fazer Login
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="w-full"
              >
                Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Se estiver autenticado, mostrar o conteúdo protegido
  return <>{children}</>;
}
