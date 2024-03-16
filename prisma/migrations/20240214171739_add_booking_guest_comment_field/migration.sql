/*
  Warnings:

  - Made the column `guestFirstName` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `guestPhone` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "guestComment" TEXT,
ALTER COLUMN "guestFirstName" SET NOT NULL,
ALTER COLUMN "guestPhone" SET NOT NULL;
