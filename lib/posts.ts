import "server-only";
import { prisma } from "@/lib/prisma";

/** Pour l'administration : tout, y compris les brouillons. */
export function listAllPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

/** Pour le site public : uniquement ce qui est publié. */
export function listPublishedPosts(take?: number) {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take,
  });
}

export function getPostBySlug(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export function getPostById(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export function listPublishedPostsPaged(page = 1, perPage = 9) {
  return Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.post.count({ where: { published: true } }),
  ]);
}