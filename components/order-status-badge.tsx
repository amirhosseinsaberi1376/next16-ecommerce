import { Badge } from "./ui/badge";

export default function OrderStatusBadge({ status }: { status: string }) {
  return <Badge variant="outline">{status}</Badge>;
}
