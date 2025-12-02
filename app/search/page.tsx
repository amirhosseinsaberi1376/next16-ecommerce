import BreadCrumbs from "@/components/breadcrumbs";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import ProductCard from "../ProductCard";
import ProductsSkeleton from "../ProductsSkeleton";

interface SearchPageProps {
  searchParams: Promise<{ query?: string }>;
}
async function Products({ searchParams }: SearchPageProps) {
  const query = (await searchParams).query?.trim();

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 18,
  });

  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (await searchParams).query?.trim();

  const breadcrumbs = [
    { label: "Products", href: "/" },
    { label: `Results for "${query}"`, href: "/search", active: true },
  ];

  return (
    <main className="container mx-auto py-4">
      <BreadCrumbs items={breadcrumbs} />

      <Suspense key={query} fallback={<ProductsSkeleton />}>
        <Products searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
