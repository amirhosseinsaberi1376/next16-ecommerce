import BreadCrumbs from "@/components/breadcrumbs";
import ProductListServerWrapper from "@/components/product-list-server-wrapper";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductsSkeleton from "../../ProductsSkeleton";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
  });

  if (!category) return {};

  return {
    title: category.name,
    openGraph: {
      title: category.name,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      slug: true,
    },
  });

  if (!category) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Products", href: "/" },
    {
      label: category?.name ?? "Category",
      href: `/search/${category.slug}`,
      active: true,
    },
  ];

  return (
    <>
      <BreadCrumbs items={breadcrumbs} />

      <Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
        <ProductListServerWrapper params={{ slug, sort }} />
      </Suspense>
    </>
  );
}
