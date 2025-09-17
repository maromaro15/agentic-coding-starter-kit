"use client";

import Link from "next/link";
import { UserProfile } from "@/components/auth/user-profile";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import { Zap, LayoutDashboard } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export function SiteHeader() {
  const { data: session } = useSession();
  
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link
            href="/"
            className="flex items-center gap-3 text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
              <Zap className="h-6 w-6" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-semibold">
              TaskFlow
            </span>
          </Link>
        </h1>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 px-3 py-2 rounded-lg hover:bg-muted/50"
          >
            Home
          </Link>
          {session && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 px-3 py-2 rounded-lg hover:bg-muted/50"
            >
              Dashboard
            </Link>
          )}
        </nav>
        
        <div className="flex items-center gap-3">
          {session && (
            <Button asChild variant="ghost" size="sm" className="md:hidden rounded-xl px-4 py-2 h-10">
              <Link href="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          )}
          <UserProfile />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
