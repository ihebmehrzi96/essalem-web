import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@clinique-essalem.com";
  const password = "ChangeMoi2026!";

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, name: "Administrateur", passwordHash },
  });

  console.log(`Compte pret : ${email} / ${password}`);
}

main().finally(() => prisma.$disconnect());
