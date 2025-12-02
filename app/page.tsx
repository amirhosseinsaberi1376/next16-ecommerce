import BreadCrumbs from "@/components/breadcrumbs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import ProductCard from "./ProductCard";
import ProductsSkeleton from "./ProductsSkeleton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const pageSize = 3;

async function Products({ page }: { page: number }) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    skip,
    take: pageSize,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;

  const total = await prisma.product.count();

  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="container mx-auto py-4">
      <BreadCrumbs items={[{ label: "Products", href: "/" }]} />
      <Suspense key={page} fallback={<ProductsSkeleton />}>
        <Products page={page} />
      </Suspense>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${page - 1}`} />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${index + 1}`}
                isActive={page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href={`?page=${page + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
