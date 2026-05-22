export type MediaKind =
  | "user-profile-image"
  | "course-thumbnail"
  | "course-banner"
  | "category-image"
  | "blog-image";

export type StoredMediaAsset = {
  provider: string;
  storageKey: string;
  url: string;
};

export type MediaUploadFile = {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name: string;
  size: number;
  type: string;
};

export type MediaStorageProvider = {
  delete: (asset: StoredMediaAsset) => Promise<void>;
  upload: (kind: MediaKind, file: MediaUploadFile) => Promise<StoredMediaAsset>;
};
