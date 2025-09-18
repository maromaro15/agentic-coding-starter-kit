"use client";

import Link from "next/link";
import { UserProfile } from "@/components/auth/user-profile";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Zap, LayoutDashboard, Menu, X } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";

export function SiteHeader() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 text-primary hover:text-primary/80 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 border border-primary/20">
              <Zap className="h-4 w-4 sm:h-6 sm:w-6" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-semibold text-lg sm:text-2xl">
              TaskFlow
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
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
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <UserProfile />
          <ModeToggle />
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Logo */}
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-semibold text-xl">
                    TaskFlow
                  </span>
                </div>
                
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/"
                    className="text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300 px-4 py-3 rounded-lg hover:bg-muted/50 flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                  {session && (
                    <Link
                      href="/dashboard"
                      className="text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300 px-4 py-3 rounded-lg hover:bg-muted/50 flex items-center gap-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Dashboard
                    </Link>
                  )}
                </nav>
                
                {/* Mobile User Profile */}
                <div className="pt-4 border-t">
                  <UserProfile />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
