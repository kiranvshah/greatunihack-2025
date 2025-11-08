import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // wipe existing data, beginning with child tables
  await prisma.perkTransaction.deleteMany();
  await prisma.tenancyTransaction.deleteMany();
  await prisma.user.deleteMany();
  await prisma.perk.deleteMany();

  // create users
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: "Tom Jones",
        wallet_balance: 100,
        next_payment_due: new Date("2025-12-01"),
      },
      {
        id: 2,
        name: "Alice Smith",
        wallet_balance: 41,
        next_payment_due: new Date("2025-11-05"),
      },
    ],
  });

  // create perks
  await prisma.perk.createMany({
    data: [
      {
        title: "Free coffee",
        description: "Get a free coffee from our partner cafe.",
        cost: 25,
        image_url:
          "https://www.coffeedesk.com/blog/wp-content/uploads/2021/06/49556774456_2f150ebf50_k-1920x1282.jpg",
        available: true,
      },
    ],
  });

  console.log("Seeding finished 🌱");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
