"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/auth/sign-in-button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Brain, 
  Filter, 
  Calendar, 
  CheckCircle, 
  CheckSquare,
  BarChart3, 
  Sparkles, 
  ArrowRight,
  Star,
  LogIn
} from "lucide-react";

export default function Home() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <main className="flex-1 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded-xl"></div>
            <div className="h-64 bg-muted rounded-xl"></div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="h-32 bg-muted rounded-xl"></div>
              <div className="h-32 bg-muted rounded-xl"></div>
              <div className="h-32 bg-muted rounded-xl"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex-1 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 shadow-lg">
                <CheckSquare className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Smart Task Management with AI ✨
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Organize your tasks with intelligent categorization and priority suggestions powered by AI. 
              Make productivity feel effortless and enjoyable.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <Card className="border border-border shadow-sm hover:shadow-lg transition-all duration-250 hover:scale-102 bg-card">
              <CardHeader className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-sm">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-card-foreground">AI Categorization</CardTitle>
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Automatically categorize and prioritize your tasks using advanced AI that learns from your patterns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-lg transition-all duration-250 hover:scale-102 bg-card">
              <CardHeader className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center shadow-sm">
                    <CheckSquare className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-card-foreground">Smart Organization</CardTitle>
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Filter, sort, and manage your todos with powerful organization tools that make productivity effortless
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border shadow-sm hover:shadow-lg transition-all duration-250 hover:scale-102 bg-card">
              <CardHeader className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center shadow-sm">
                    <LogIn className="h-6 w-6 text-success" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-card-foreground">Secure & Personal</CardTitle>
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  Your tasks are private and secure with user authentication, keeping your productivity data safe
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 pt-8">
            <p className="text-muted-foreground text-lg">
              Ready to transform your productivity? 🚀 Sign in to start managing your tasks with AI-powered insights
            </p>
            <SignInButton />
          </div>
        </div>
      </main>
    );
  }

    return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="p-3 sm:p-4 rounded-2xl bg-primary/10 shadow-sm">
              <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">
              TaskFlow
            </h1>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground px-2">
              The AI-Powered Task Management Revolution
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Transform your productivity with intelligent task categorization, smart prioritization, 
              and seamless workflow management. Let AI handle the organization while you focus on what matters.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 px-4">
            {session ? (
              <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-sm w-full sm:w-auto">
                <Link href="/dashboard" className="flex items-center justify-center gap-2">
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-sm w-full sm:w-auto">
                Get Started Free
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
              </Button>
            )}
            
            <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-sm w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-6 sm:pt-8 text-xs sm:text-sm text-muted-foreground px-4">
            <div className="flex items-center gap-2">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
              <span>10,000+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground px-2">Why Choose TaskFlow?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Experience the future of task management with features designed to supercharge your productivity
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Brain className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">AI-Powered Categorization</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Let our intelligent AI automatically categorize your tasks into Work, Personal, Shopping, Health, and more. No manual sorting required.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Filter className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Smart Filtering & Search</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  Find any task instantly with powerful search and filtering options. Sort by priority, category, due date, or completion status.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Due Date Management</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  Never miss a deadline with intelligent due date tracking, overdue highlighting, and upcoming task notifications.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Priority Management</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  Color-coded priority levels (High, Medium, Low) help you focus on what matters most and maintain optimal workflow.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Progress Analytics</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  Track your productivity with detailed statistics, completion rates, and category distribution insights.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Beautiful Interface</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  Enjoy a clean, modern interface with dark/light mode support, smooth animations, and responsive design.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground px-2">
                Ready to Transform Your Productivity?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed px-2">
                Join thousands of users who have already revolutionized their task management with TaskFlow's AI-powered features.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 px-4">
              {session ? (
                <Button asChild size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-sm w-full sm:w-auto">
                  <Link href="/dashboard" className="flex items-center justify-center gap-2">
                    Open Dashboard
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-sm w-full sm:w-auto">
                  Start Free Today
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12 px-4">
              <div className="text-center space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-primary">10,000+</div>
                <div className="text-sm sm:text-base text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm sm:text-base text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm sm:text-base text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
