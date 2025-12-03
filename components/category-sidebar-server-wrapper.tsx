import { prisma } from "@/lib/prisma";
import CategorySidebar from "./category-sidebar";

export async function CategorySidebarServerWrapper() {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return <CategorySidebar categories={categories} />;
}
