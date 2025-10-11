"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type TipoConta = "Owner" | "Collaborator";

export type User = {
  id: string;
  nome: string;
  email: string;
  senha?: string; // Não deve ser exposta, apenas para referência
  tipo_de_conta?: TipoConta;
  telefone?: string;
  data_criacao?: string;
  ultimo_login?: string;
  roles?: string[];
  ativo?: boolean;
  created_at?: string;
  updated_at?: string;
  updated_by?: string;
};

type AuthContextType = {
  user: User | null;
  login: (id: string, senha: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há dados de usuário salvos no localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (id: string, senha: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://user-management-autogenius.vercel.app/api/verify?id=${encodeURIComponent(
          id
        )}&senha=${encodeURIComponent(senha)}`
      );

      const data = await response.json();

      if (data.success && data.user) {
        const userData: User = {
          id: data.user.id,
          nome: data.user.nome,
          email: data.user.email || "usuario@exemplo.com",
          tipo_de_conta: data.user.tipo_de_conta || "Owner",
          telefone: data.user.telefone || "+55 11 99999-9999",
          data_criacao: data.user.data_criacao || new Date().toISOString(),
          ultimo_login: new Date().toISOString(),
          roles: data.user.roles || ["admin", "mechanic"],
          ativo: data.user.ativo !== undefined ? data.user.ativo : true,
          created_at: data.user.created_at || new Date().toISOString(),
          updated_at: data.user.updated_at || new Date().toISOString(),
          updated_by: data.user.updated_by || data.user.id,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
