"use client";

import { Product } from "@/app/generated/prisma/client";
import { addToCart } from "@/lib/actions";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function AddToCartButton({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState<boolean>();

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(product.id, 1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={product.inventory === 0 || isAdding}
      className="w-full"
    >
      <ShoppingCart className="mr-2 size-4" />
      {product.inventory > 0 ? "Add to cart" : "Out of stock"}
    </Button>
  );
}
