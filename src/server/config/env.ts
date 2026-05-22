import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";

const serverEnvSchema = z
  .object({
    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    AUTH_LINKEDIN_ID: z.string().optional(),
    AUTH_LINKEDIN_SECRET: z.string().optional(),
    AUTH_SECRET: z.string().min(32).optional(),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required."),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  })
  .superRefine((env, context) => {
    if (env.NODE_ENV === "production" && !env.AUTH_SECRET) {
      context.addIssue({
        code: "custom",
        message: "AUTH_SECRET is required in production.",
        path: ["AUTH_SECRET"],
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

export function getNodeEnv() {
  return getServerEnv().NODE_ENV;
}

export function getAuthSecret() {
  return getServerEnv().AUTH_SECRET;
}

export function getAuthProviderEnv() {
  const env = getServerEnv();

  return {
    github: {
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
    google: {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    },
    linkedin: {
      clientId: env.AUTH_LINKEDIN_ID,
      clientSecret: env.AUTH_LINKEDIN_SECRET,
    },
  };
}
