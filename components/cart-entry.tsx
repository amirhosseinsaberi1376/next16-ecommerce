import { CartItemWithProduct } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

export default function CartEntry({ cartItem }: CartEntryProps) {
  return (
    <li className="border-b border-muted flex py-4 justify-between">
      <div className="flex gap-x-4">
        <div className="overflow-hidden rounded-md border border-muted size-16">
          <Image
            className="size-full object-cover"
            width={128}
            height={128}
            src={cartItem.product.image ?? ""}
            alt={cartItem.product.description ?? ""}
          />
        </div>
        <div>
          <div className="flex flex-col">
            <div className="font-medium">{cartItem.product.name}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end gap-2">
        <p className="font-medium">{formatPrice(cartItem.product.price)}</p>
        <div className="flex items-center border border-muted rounded-full">
          <Button variant="ghost" className="rounded-l-full">
            <Minus className="size-4" />
          </Button>
          <p className="w-6 text-center">{cartItem.quantity}</p>
          <Button variant="ghost" className="rounded-r-full">
            <Plus className="size-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}
