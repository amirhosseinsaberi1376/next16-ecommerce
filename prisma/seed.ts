import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient, Product } from "../app/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
    },
  });

  const home = await prisma.category.create({
    data: {
      name: "Home",
      slug: "home",
    },
  });

  const products: Product[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      description:
        "Premium noise-cancelling wireless headphones with long battery life.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      categoryId: electronics.id,
      slug: "wireless-headphones",
    },
    {
      id: "2",
      name: "Smart Watch",
      description:
        "Fitness tracker with heart rate monitoring and sleep analysis.",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      categoryId: electronics.id,
      slug: "smart-watch",
    },
    {
      id: "3",
      name: "Running Shoes",
      description: "Lightweight running shoes with responsive cushioning",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      categoryId: clothing.id,
      slug: "running-shoes",
    },
    {
      id: "4",
      name: "Ceramic Mug",
      description: "Handcrafted ceramic mug with minimalist design",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
      categoryId: home.id,
      slug: "ceramic-mug",
    },
    {
      id: "5",
      name: "Leather Backpack",
      description: "Durable leather backpack with multiple compartments",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryId: clothing.id,
      slug: "leather-backpack",
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}

main()
  .then(async () => {
    console.log("seeding completed!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
