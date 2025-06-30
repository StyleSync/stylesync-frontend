-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "clientId" TEXT;

-- CreateTable
CREATE TABLE "ProfessionalClient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "email" TEXT,
    "image" TEXT,
    "professionalId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfessionalClient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProfessionalClient" ADD CONSTRAINT "ProfessionalClient_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "ProfessionalClient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
