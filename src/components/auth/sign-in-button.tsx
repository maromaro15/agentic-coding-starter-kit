"use client";

import { signIn, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function SignInButton() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button disabled size="lg" className="gap-2 rounded-xl px-8 py-3 h-12">
        <div className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
        Loading...
      </Button>
    );
  }

  if (session) {
    return null;
  }

  return (
    <Button
      size="lg"
      className="gap-3 rounded-xl px-8 py-3 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      onClick={async () => {
        await signIn.social({
          provider: "google",
          callbackURL: "/dashboard",
        });
      }}
    >
      <LogIn className="h-5 w-5" />
      Sign In to Get Started
    </Button>
  );
}
