import "server-only";
import { prisma } from "@/lib/prisma";

/** Administration : toutes les offres, actives ou non. */
export function listAllOffers() {
  return prisma.jobOffer.findMany({
    orderBy: { createdAt: "desc" },
  });
}

/** Site public : uniquement les offres actives. */
export function listActiveOffers() {
  return prisma.jobOffer.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getOfferById(id: string) {
  return prisma.jobOffer.findUnique({ where: { id } });
}

export function countApplications() {
  return prisma.application.count();
}

export function listApplications() {
  return prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: { jobOffer: { select: { title: true } } },
  });
}

export function getApplicationById(id: string) {
  return prisma.application.findUnique({
    where: { id },
    include: { jobOffer: { select: { title: true } } },
  });
}