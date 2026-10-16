-- CreateTable
CREATE TABLE "JobOffer" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "jobOfferId" TEXT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "qualification" TEXT,
    "promoYear" TEXT,
    "cv" TEXT,
    "motivation" TEXT,
    "diploma" TEXT,
    "baccalaureat" TEXT,
    "transcripts" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobOffer_active_createdAt_idx" ON "JobOffer"("active", "createdAt");

-- CreateIndex
CREATE INDEX "Application_handled_createdAt_idx" ON "Application"("handled", "createdAt");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "JobOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
