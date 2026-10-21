-- AlterTable
ALTER TABLE "Specialty" ADD COLUMN     "parentId" TEXT;

-- CreateIndex
CREATE INDEX "Specialty_parentId_idx" ON "Specialty"("parentId");

-- AddForeignKey
ALTER TABLE "Specialty" ADD CONSTRAINT "Specialty_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
