import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";

const serverEnvSchema = z
  .object({
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required."),
    JWT_ACCESS_SECRET: z.string().min(32).optional(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  })
  .superRefine((env, context) => {
    if (env.NODE_ENV === "production" && !env.JWT_ACCESS_SECRET) {
      context.addIssue({
        code: "custom",
        message: "JWT_ACCESS_SECRET is required in production.",
        path: ["JWT_ACCESS_SECRET"],
      });
    }
  });

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedServerEnv: ServerEnv | null = null;

export function loadEnvFile(envPath = resolve(process.cwd(), ".env")) {
  if (!existsSync(envPath)) {
    return;
  }

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");

    process.env[key] ??= value;
  }
}

export function getServerEnv() {
  loadEnvFile();

  cachedServerEnv ??= serverEnvSchema.parse(process.env);

  return cachedServerEnv;
}

export function getDatabaseUrl() {
  return getServerEnv().DATABASE_URL;
}

export function getJwtAccessSecret() {
  return getServerEnv().JWT_ACCESS_SECRET;
}

export function getNodeEnv() {
  return getServerEnv().NODE_ENV;
}
