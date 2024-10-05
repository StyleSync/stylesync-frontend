-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_serviceProfessionalId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceOnProfessional" DROP CONSTRAINT "ServiceOnProfessional_professionalId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceOnProfessional" DROP CONSTRAINT "ServiceOnProfessional_serviceId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ServiceOnProfessional" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "ServiceOnProfessional" ADD CONSTRAINT "ServiceOnProfessional_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOnProfessional" ADD CONSTRAINT "ServiceOnProfessional_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceProfessionalId_fkey" FOREIGN KEY ("serviceProfessionalId") REFERENCES "ServiceOnProfessional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
