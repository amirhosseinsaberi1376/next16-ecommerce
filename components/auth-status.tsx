"use client";

import { LogIn, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function AuthStatus() {
  const { status } = useSession();

  if (status === "loading") {
    return <Skeleton className="size-9" />;
  }

  if (status === "unauthenticated") {
    return (
      <Button variant="ghost" size="icon" asChild>
        <Link href="/auth/signin">
          <LogIn className="size-5" />
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={() => signOut()}>
      <LogOut className="size-5" />
    </Button>
  );
}
