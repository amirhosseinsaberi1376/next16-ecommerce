"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { cookies } from "next/headers";
import { getCart } from "./actions";
import { prisma } from "./prisma";

export type ProcessCheckoutResponse = {
  order: OrderWithItemAndProduct;
};

type OrderWithItemAndProduct = Prisma.OrderGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export async function processCheckout(): Promise<ProcessCheckoutResponse> {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  let orderId: string | null = null;

  try {
    const order = await prisma.$transaction(async (tx) => {
      const total = cart.subtotal;

      const newOrder = await tx.order.create({
        data: {
          total,
        },
      });

      const orderItems = cart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        orderId: newOrder.id,
        price: item.product.price,
      }));

      await tx.orderItem.createMany({
        data: orderItems,
      });

      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      await tx.cart.deleteMany({
        where: {
          id: cart.id,
        },
      });

      return newOrder;
    });

    orderId = order.id;

    const fullOrder = await prisma.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!fullOrder) throw new Error("Order not found");

    await prisma.order.update({
      where: {
        id: fullOrder.id,
      },
      data: {
        status: "pending_payment",
      },
    });

    (await cookies()).delete("cartId");

    return {
      order: fullOrder,
    };
  } catch (error) {
    if (orderId) {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "failed",
        },
      });
    }

    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}
