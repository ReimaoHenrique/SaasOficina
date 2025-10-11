"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Calculator,
  Wrench,
  User,
  Info,
  Phone,
  Menu,
  X,
  FileText,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useAuth } from "@/contexts/auth-context";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  matchExact: boolean;
}

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const getNavItems = (): NavItem[] => {
    const publicItems: NavItem[] = [
      { name: "Início", href: "/", icon: Home, matchExact: true },
      { name: "Sobre", href: "/sobre", icon: Info, matchExact: true },
      { name: "Contato", href: "/contato", icon: Phone, matchExact: true },
    ];

    if (isAuthenticated) {
      const protectedItems: NavItem[] = [
        {
          name: "Orçamento",
          href: "/orcamento",
          icon: Calculator,
          matchExact: false,
        },
        {
          name: "Serviços",
          href: "/servicos",
          icon: Wrench,
          matchExact: false,
        },
      ];
      // Inserir itens protegidos após "Início"
      publicItems.splice(1, 0, ...protectedItems);
    }

    return publicItems;
  };

  const isActive = (href: string, exact: boolean) => {
    return exact ? pathname === href : pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-16 flex justify-between items-center mx-5">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center">
          <Wrench className="h-6 w-6" />
        </Link>

        {/* Title/Desktop Navigation - Center */}
        <div className="flex items-center">
          {/* Desktop Navigation - Hidden on mobile */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {getNavItems().map((item) => {
                const active = isActive(item.href, item.matchExact);
                const Icon = item.icon;
                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "flex items-center gap-2",
                        active ? "bg-accent text-accent-foreground" : ""
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Title - Hidden on desktop */}
          <Link href="/" className="md:hidden">
            <span className="font-bold">Oficina Pro</span>
          </Link>
        </div>

        {/* Mobile menu button - Right */}
        <div className="flex items-center gap-4">
          <Link href="/solicitar-orcamento" className="hidden md:block">
            <Button size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              Solicitar Orçamento
            </Button>
          </Link>
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/perfil">
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  {user?.nome}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <User className="mr-2 h-4 w-4" />
                Entrar
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-2 space-y-1">
            {getNavItems().map((item) => {
              const active = isActive(item.href, item.matchExact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground/60 hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              );
            })}
            <div className="px-4 py-2 space-y-2">
              <Link href="/solicitar-orcamento" className="block">
                <Button
                  className="w-full gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText className="h-4 w-4" />
                  Solicitar Orçamento
                </Button>
              </Link>
              {isAuthenticated ? (
                <div className="w-full space-y-2">
                  <Link href="/perfil" className="block">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Meu Perfil
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              ) : (
                <Link href="/login" className="block">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Entrar
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
