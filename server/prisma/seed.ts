import "dotenv/config";
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
        cost_per_month: 600.0,
      },
      {
        id: 2,
        name: "Alice Smith",
        wallet_balance: 41,
        next_payment_due: new Date("2025-11-05"),
        cost_per_month: 900.0,
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
      {
        title: "Cinema ticket",
        description: "Enjoy a movie night with a free cinema ticket.",
        cost: 50,
        image_url: "https://www.cameronhouse.co.uk/content/uploads/2024/03/camern-house-cinema-960x1030.jpg",
        available: true,
      },
      {
        title: "Gym membership",
        description: "One month's free gym membership.",
        cost: 100,
        image_url: "https://linkspaces.co.uk/wp-content/uploads/2024/05/gb-botanica-gym-link-spaces-slough.jpg",
        available: true,
      },
    ],
  });

  // create past tenancy transactions for user 1
  await prisma.tenancyTransaction.createMany({
    data: [
      {
        user_id: 1,
        amount: 600,
        date_time: new Date("2025-07-09"),
      },
      {
        user_id: 1,
        amount: 1800,
        date_time: new Date("2025-08-09"),
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
