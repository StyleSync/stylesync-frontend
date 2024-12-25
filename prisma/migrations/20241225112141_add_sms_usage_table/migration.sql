-- AlterTable
ALTER TABLE "Professional" ADD COLUMN     "isBetaUser" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "SmsUsage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmsUsage_pkey" PRIMARY KEY ("id")
);
