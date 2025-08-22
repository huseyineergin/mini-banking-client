"use client";

import { logoutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { ThemeToggler } from "./theme-toggler";
import { NavigationMenu } from "./ui/navigation-menu";

export default function Header() {
  const setUsername = useAuthStore((state) => state.setUsername);
  const username = useAuthStore((state) => state.username);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleLogout(e: React.FormEvent) {
    startTransition(async () => {
      e.preventDefault();
      await logoutAction();
      router.push("/login");
      setUsername("");
    });
  }

  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/accounts" className="text-sm font-semibold md:text-base">
          <div className="text-center">
            Mini Banking
            <br />
            Application
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden gap-2 md:flex" viewport={false}>
          <div>{username}</div>

          <ThemeToggler />

          <form onSubmit={handleLogout}>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Logout"}
            </Button>
          </form>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex w-64 flex-col justify-between p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2">
                  <SheetTitle>Menu</SheetTitle>
                  <ThemeToggler />
                </div>
              </div>

              <form onSubmit={handleLogout}>
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Loader2 className="animate-spin" /> : "Logout"}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
