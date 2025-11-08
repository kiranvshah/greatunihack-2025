-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "wallet_balance" INTEGER NOT NULL,
    "next_payment_due" DATE NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perk" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Perk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenancyTransaction" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "TenancyTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerkTransaction" (
    "id" SERIAL NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "perk_id" INTEGER NOT NULL,

    CONSTRAINT "PerkTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TenancyTransaction" ADD CONSTRAINT "TenancyTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerkTransaction" ADD CONSTRAINT "PerkTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerkTransaction" ADD CONSTRAINT "PerkTransaction_perk_id_fkey" FOREIGN KEY ("perk_id") REFERENCES "Perk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
