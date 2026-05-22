import { randomUUID } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { getStorageEnv } from "@/server/config/env";
import type {
  MediaKind,
  MediaStorageProvider,
} from "@/server/media/media.types";

const mediaKindDirectories: Record<MediaKind, string> = {
  "blog-image": "blog-images",
  "category-image": "category-images",
  "course-banner": "course-banners",
  "course-thumbnail": "course-thumbnails",
  "user-profile-image": "user-profile-images",
};

const imageExtensions = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

export function createLocalMediaProvider(): MediaStorageProvider {
  const storageEnv = getStorageEnv();
  const storageRoot = resolve(
    /* turbopackIgnore: true */ process.cwd(),
    storageEnv.localRoot,
  );
  const publicBaseUrl = normalizePublicBaseUrl(storageEnv.publicBaseUrl);

  return {
    async delete(asset) {
      const assetPath = resolveAssetPath(storageRoot, asset.storageKey);

      await rm(assetPath, { force: true });
    },
    async upload(kind, file) {
      const extension = imageExtensions[file.type as keyof typeof imageExtensions];

      if (!extension) {
        throw new Error("MEDIA_UNSUPPORTED_TYPE");
      }

      const storageKey = `${mediaKindDirectories[kind]}/${randomUUID()}.${extension}`;
      const assetPath = resolveAssetPath(storageRoot, storageKey);

      await mkdir(resolve(assetPath, ".."), { recursive: true });
      await writeFile(assetPath, Buffer.from(await file.arrayBuffer()));

      return {
        provider: storageEnv.provider,
        storageKey,
        url: `${publicBaseUrl}/${storageKey}`,
      };
    },
  };
}

function normalizePublicBaseUrl(publicBaseUrl: string) {
  const normalized = publicBaseUrl.trim().replace(/\/+$/, "");

  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function resolveAssetPath(storageRoot: string, storageKey: string) {
  const assetPath = resolve(storageRoot, ...storageKey.split("/"));

  if (assetPath !== storageRoot && !assetPath.startsWith(`${storageRoot}${sep}`)) {
    throw new Error("MEDIA_INVALID_STORAGE_KEY");
  }

  return assetPath;
}
