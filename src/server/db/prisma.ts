import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/prisma";
import { getDatabaseUrl, getNodeEnv } from "@/server/config/env";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const nodeEnv = getNodeEnv();

  return new PrismaClient({
    adapter: new PrismaMariaDb(getDatabaseUrl()),
    log:
      nodeEnv === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (getNodeEnv() !== "production") {
  globalForPrisma.prisma = prisma;
}
