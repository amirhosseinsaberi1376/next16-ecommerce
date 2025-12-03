import { CategorySidebarServerWrapper } from "@/components/category-sidebar-server-wrapper";
import SortingControls from "@/components/sorting-controls";
import { ReactNode, Suspense } from "react";

export default async function SearchLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="container mx-auto py-4">
      <div className="flex gap-8">
        <div className="w-[125px] flex-none">
          <Suspense fallback={<div className="w-[125px]">Loading...</div>}>
            <CategorySidebarServerWrapper />
          </Suspense>
        </div>
        <div className="flex-1">{children}</div>
        <div className="w-[125px] flex-none">
          <SortingControls />
        </div>
      </div>
    </main>
  );
}
