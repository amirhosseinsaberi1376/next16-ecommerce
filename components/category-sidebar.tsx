import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CategorySidebar({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="hidden lg:block">
      <div className="sticky top-0 z-10 flex h-full w-64 flex-col overflow-auto border-r bg-background">
        <div className="flex-1 px-4 py-6">
          <h2 className="mb-4 text-lg font-semibold">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/search/${category.slug}`}
                  className="block p-2 "
                ></Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
