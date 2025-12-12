import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export async function CartIndicatorSkeleton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative opacity-50"
      asChild
      disabled
    >
      <Link href="/cart">
        <ShoppingCart className="size-5" />
      </Link>
    </Button>
  );
}
