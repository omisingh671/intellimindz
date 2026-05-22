import { getStorageEnv } from "@/server/config/env";
import { createLocalMediaProvider } from "@/server/media/local-media.provider";
import type {
  MediaKind,
  MediaStorageProvider,
  MediaUploadFile,
  StoredMediaAsset,
} from "@/server/media/media.types";

export const imageMediaMimeTypes = ["image/jpeg", "image/png", "image/webp"] as const;
export const imageMediaMaxBytes = 2 * 1024 * 1024;

export class MediaValidationError extends Error {}

export async function uploadImageMedia(kind: MediaKind, file: MediaUploadFile) {
  validateImageFile(file);

  return getMediaStorageProvider().upload(kind, file);
}

export async function deleteStoredMedia(asset: StoredMediaAsset | null) {
  if (!asset) {
    return;
  }

  const provider = getMediaStorageProvider();

  if (asset.provider !== getStorageEnv().provider) {
    return;
  }

  await provider.delete(asset);
}

function getMediaStorageProvider(): MediaStorageProvider {
  const { provider } = getStorageEnv();

  if (provider === "local") {
    return createLocalMediaProvider();
  }

  throw new Error("MEDIA_PROVIDER_UNAVAILABLE");
}

function validateImageFile(file: MediaUploadFile) {
  if (!imageMediaMimeTypes.includes(file.type as (typeof imageMediaMimeTypes)[number])) {
    throw new MediaValidationError("Choose a JPEG, PNG, or WebP image.");
  }

  if (file.size <= 0 || file.size > imageMediaMaxBytes) {
    throw new MediaValidationError("Profile picture must be 2 MB or less.");
  }
}
