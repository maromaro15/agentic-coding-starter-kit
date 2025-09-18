"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { SignInButton } from "./sign-in-button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";

export function UserProfile() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFF8F0] to-[#FED7AA] border-2 border-[#E7E5E4] animate-pulse">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#F4A261] to-[#E76F51] opacity-30"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-white to-[#FFF8F0] rounded-2xl border-2 border-[#E7E5E4]">
        <div className="text-2xl mb-2">👋</div>
        <p className="text-sm text-[#4A5568] font-medium mb-2">Welcome! Please sign in to get started</p>
        <SignInButton />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-12 cursor-pointer transition-all duration-300 hover:scale-110 ring-2 ring-transparent hover:ring-[#F4A261] hover:shadow-lg">
          <AvatarImage
            src={session.user?.image || ""}
            alt={session.user?.name || "User"}
            referrerPolicy="no-referrer"
            className="rounded-2xl"
          />
          <AvatarFallback className="bg-gradient-to-br from-[#F4A261] to-[#E76F51] text-white font-bold text-lg rounded-2xl">
            {(
              session.user?.name?.[0] ||
              session.user?.email?.[0] ||
              "U"
            ).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 rounded-2xl border-2 border-[#E7E5E4] shadow-xl bg-gradient-to-br from-white to-[#FFF8F0]">
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">👤</span>
              <p className="text-sm font-bold leading-none text-[#2D3748]">
                {session.user?.name || 'User'}
              </p>
            </div>
            <p className="text-xs leading-none text-[#4A5568] font-medium pl-6">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#E7E5E4] mx-2" />
        <DropdownMenuItem asChild className="mx-2 my-1 rounded-xl hover:bg-accent hover:text-accent-foreground transition-all duration-200">
          <Link href="/profile" className="flex items-center px-3 py-3 font-medium text-[#2D3748]">
            <User className="mr-3 h-4 w-4 text-[#F4A261]" />
            🏠 Your Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#E7E5E4] mx-2" />
        <DropdownMenuItem onClick={handleSignOut} className="mx-2 my-1 rounded-xl hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 font-medium text-destructive">
          <LogOut className="mr-3 h-4 w-4" />
          👋 Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
