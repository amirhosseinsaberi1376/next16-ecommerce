import ProductsSkeleton from "./ProductsSkeleton";

export default function LoadingPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <ProductsSkeleton />
    </main>
  );
}
