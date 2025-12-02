import { Skeleton } from "./ui/skeleton";

export default function BreadcrumsSkeleton() {
  return (
    <div className="mb-6 h-8 flex items-center gap-2">
      <Skeleton className="size-4 rounded-full" />
      <Skeleton className="h-4 w-20 rounded-full" />
      <Skeleton className="h-4 w-[120px] rounded-full" />
    </div>
  );
}
