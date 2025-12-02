import BreadcrumsSkeleton from "@/components/breadcrumbs-skeleton";
import ProductsSkeleton from "./ProductsSkeleton";

export default function LoadingPage() {
  return (
    <main className="container mx-auto py-4">
      <BreadcrumsSkeleton />
      <ProductsSkeleton />
    </main>
  );
}
