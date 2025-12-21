import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const orderId = searchParams.get("orderId");

  if (!orderId) notFound();

  if (orderId) {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "pending",
      },
    });
  }
}
