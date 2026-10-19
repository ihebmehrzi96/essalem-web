import "server-only";
import { prisma } from "@/lib/prisma";

export function listMessages() {
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function countPendingMessages() {
  return prisma.contactMessage.count({ where: { handled: false } });
}