"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Settings,
  Edit,
  ArrowLeft,
  Clock,
  UserCheck,
  UserX,
  Key,
  Database,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";

export default function PerfilPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Acesso Negado
            </h2>
            <p className="text-gray-600 mb-4">
              Você precisa estar logado para acessar esta página.
            </p>
            <Button onClick={() => router.push("/login")}>Fazer Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Não disponível";
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Data inválida";
    }
  };

  const getTipoContaColor = (tipo?: string) => {
    switch (tipo) {
      case "Owner":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Collaborator":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTipoContaText = (tipo?: string) => {
    switch (tipo) {
      case "Owner":
        return "Proprietário";
      case "Collaborator":
        return "Colaborador";
      default:
        return "Não definido";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "mechanic":
        return "bg-green-100 text-green-800 border-green-200";
      case "manager":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleText = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "Administrador";
      case "mechanic":
        return "Mecânico";
      case "manager":
        return "Gerente";
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
              <p className="text-gray-600 mt-1">
                Gerencie suas informações pessoais e configurações
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informações Pessoais */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" />
                        Informações Pessoais
                      </CardTitle>
                      <CardDescription>
                        Dados básicos da sua conta
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? "Cancelar" : "Editar"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Nome Completo
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <p className="font-medium">{user.nome}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Tipo de Conta
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <Badge
                          className={getTipoContaColor(user.tipo_de_conta)}
                        >
                          {getTipoContaText(user.tipo_de_conta)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Email
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <p>{user.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Telefone
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <p>{user.telefone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      Permissões (Roles)
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <div className="flex flex-wrap gap-2">
                        {user.roles?.map((role, index) => (
                          <Badge key={index} className={getRoleColor(role)}>
                            {getRoleText(role)}
                          </Badge>
                        )) || (
                          <span className="text-gray-500">
                            Nenhuma permissão definida
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status da Conta */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Status da Conta
                  </CardTitle>
                  <CardDescription>
                    Informações sobre o status da sua conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Status
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                        {user.ativo ? (
                          <>
                            <UserCheck className="h-4 w-4 text-green-500" />
                            <span className="text-green-700 font-medium">
                              Ativo
                            </span>
                          </>
                        ) : (
                          <>
                            <UserX className="h-4 w-4 text-red-500" />
                            <span className="text-red-700 font-medium">
                              Inativo
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Último Login
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <p>{formatDate(user.ultimo_login)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar com informações adicionais */}
            <div className="space-y-6">
              {/* Informações do Sistema */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-600" />
                    Informações do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      ID do Usuário
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-xs font-mono text-gray-600 break-all">
                        {user.id}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Data de Criação
                      </label>
                      <div className="p-2 bg-gray-50 rounded-lg border">
                        <p className="text-sm">
                          {formatDate(user.data_criacao)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500">
                        Última Atualização
                      </label>
                      <div className="p-2 bg-gray-50 rounded-lg border">
                        <p className="text-sm">{formatDate(user.updated_at)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ações */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    Ações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      // Aqui você pode implementar mudança de senha
                      alert(
                        "Funcionalidade de mudança de senha em desenvolvimento"
                      );
                    }}
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Alterar Senha
                  </Button>

                  <Separator />

                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => {
                      if (confirm("Tem certeza que deseja sair?")) {
                        logout();
                        router.push("/");
                      }
                    }}
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Sair da Conta
                  </Button>
                </CardContent>
              </Card>

              {/* Informações sobre Placeholders */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-sm text-blue-800">
                    💡 Sobre os Dados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-blue-700">
                    Alguns campos mostram dados de exemplo (placeholders) pois a
                    API atual não fornece todas as informações do perfil
                    completo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
