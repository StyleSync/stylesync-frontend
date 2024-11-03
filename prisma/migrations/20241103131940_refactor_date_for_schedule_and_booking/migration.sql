/*
  Warnings:

  - You are about to drop the column `date` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Schedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "date";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "date",
ADD COLUMN     "specificDay" INTEGER,
ADD COLUMN     "specificMonth" INTEGER,
ADD COLUMN     "specificYear" INTEGER;