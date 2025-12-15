import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const orderId = searchParams.get("orderId");

  if (orderId) {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "success",
      },
    });
  }
}
