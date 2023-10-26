-- CreateTable
CREATE TABLE "Insta" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "serivces" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Insta_pkey" PRIMARY KEY ("id")
);
