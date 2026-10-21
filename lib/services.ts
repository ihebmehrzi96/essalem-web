import "server-only";
import { prisma } from "@/lib/prisma";

/**
 * Toutes les traductions sont chargées, puis filtrées côté code.
 * Les filtres imbriqués sur `translations` font planter le moteur Prisma 7.
 */

/** Les pôles publiés. */
export function listCategories() {
  return prisma.serviceCategory.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    include: {
      translations: true,
      specialties: {
        where: { published: true, parentId: null },
        select: { id: true },
      },
    },
  });
}

/** Un pôle et ses spécialités de premier niveau. */
export function getCategory(slug: string) {
  return prisma.serviceCategory.findUnique({
    where: { slug },
    include: {
      translations: true,
      specialties: {
        where: { published: true, parentId: null },
        orderBy: { order: "asc" },
        include: { translations: true },
      },
    },
  });
}

/** Une spécialité, son pôle, sa parente éventuelle et ses sous-spécialités. */
export function getSpecialty(categorySlug: string, specialtySlug: string) {
  return prisma.specialty.findFirst({
    where: {
      slug: specialtySlug,
      published: true,
      category: { slug: categorySlug, published: true },
    },
    include: {
      translations: true,
      category: { include: { translations: true } },
      parent: { include: { translations: true } },
      children: {
        where: { published: true },
        orderBy: { order: "asc" },
        include: { translations: true },
      },
    },
  });
}

/* ───────── Administration ───────── */

export function listAllCategories() {
  return prisma.serviceCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      translations: true,
      specialties: { select: { id: true } },
    },
  });
}

export function listAllSpecialties(categoryId: string) {
  return prisma.specialty.findMany({
    where: { categoryId, parentId: null },
    orderBy: { order: "asc" },
    include: {
      translations: true,
      children: { select: { id: true } },
    },
  });
}

export function listChildren(parentId: string) {
  return prisma.specialty.findMany({
    where: { parentId },
    orderBy: { order: "asc" },
    include: { translations: true },
  });
}

export function getCategoryById(id: string) {
  return prisma.serviceCategory.findUnique({
    where: { id },
    include: { translations: true },
  });
}

export function getSpecialtyById(id: string) {
  return prisma.specialty.findUnique({
    where: { id },
    include: { translations: true, category: true, parent: true },
  });
}