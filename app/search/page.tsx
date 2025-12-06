import BreadCrumbs from "@/components/breadcrumbs";
import ProductListServerWrapper from "@/components/product-list-server-wrapper";
import { Suspense } from "react";
import ProductsSkeleton from "../ProductsSkeleton";

interface SearchPageProps {
  searchParams: Promise<{ query?: string; sort?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (await searchParams).query?.trim();
  const { sort } = await searchParams;

  const breadcrumbs = [
    { label: "Products", href: "/" },
    { label: `Results for "${query}"`, href: "/search", active: true },
  ];

  return (
    <>
      <BreadCrumbs items={breadcrumbs} />

      <Suspense key={`${query}-${sort}`} fallback={<ProductsSkeleton />}>
        <ProductListServerWrapper params={{ query, sort }} />
      </Suspense>
    </>
  );
}
