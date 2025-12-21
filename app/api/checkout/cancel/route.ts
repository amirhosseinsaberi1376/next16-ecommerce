import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: NextResponse) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) notFound();
}
