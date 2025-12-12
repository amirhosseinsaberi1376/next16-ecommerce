import Link from "next/link";
import { Suspense } from "react";
import { CartIndicator } from "./cart-indicator";
import { CartIndicatorSkeleton } from "./cart-indicator-skeleton";
import MobileNav from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import SearchInput from "./search-input";

export const CATEGORIES = [
  { id: 1, name: "Electronics", href: "/search/electronics" },
  { id: 2, name: "Clothing", href: "/search/clothing" },
  { id: 3, name: "Home", href: "/search/home" },
];

export default function Navbar() {
  return (
    <div className="border-b border-dashed">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div>
          <div className="flex items-center gap-6">
            <Link className="hidden md:block text-2xl font-bold" href="/">
              Store
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  href={category.href}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            <MobileNav />
          </div>
        </div>

        <div className="w-full mx-4 md:mx-8">
          <SearchInput />
        </div>

        <div className="flex items-center gap-0">
          <Suspense fallback={<CartIndicatorSkeleton />}>
            <CartIndicator />
          </Suspense>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
