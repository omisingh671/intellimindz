import { NextRequest } from "next/server";
import { z } from "zod";
import { LearnerType, UserRole } from "@/generated/prisma";
import { getCurrentUserFromRequest, toAuthUser } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { fail, ok } from "@/server/http/responses";
import {
  deleteStoredMedia,
  MediaValidationError,
  uploadImageMedia,
} from "@/server/media/media.service";

const learnerTypeMap = {
  professional: LearnerType.PROFESSIONAL,
  regulator: LearnerType.REGULATOR,
  student: LearnerType.STUDENT,
} as const;

const updateProfileSchema = z.object({
  city: z.string().trim().min(2),
  learnerType: z.enum(["student", "professional", "regulator"]).optional(),
  mobile: z.string().trim().max(20).optional(),
  name: z.string().trim().min(2),
  removeProfileImage: z.boolean(),
});

export async function PATCH(request: NextRequest) {
  let uploadedImage: Awaited<ReturnType<typeof uploadImageMedia>> | null = null;

  try {
    const currentUser = await getCurrentUserFromRequest(request);

    if (!currentUser) {
      return fail("Login required.", 401);
    }

    const formData = await request.formData();
    const parsed = updateProfileSchema.safeParse({
      city: readTextField(formData, "city"),
      learnerType: readOptionalTextField(formData, "learnerType"),
      mobile: readOptionalTextField(formData, "mobile"),
      name: readTextField(formData, "name"),
      removeProfileImage: readTextField(formData, "removeProfileImage") === "true",
    });

    if (!parsed.success) {
      return fail("Check your profile details and try again.", 422);
    }

    if (
      currentUser.role === UserRole.LEARNER &&
      !currentUser.learnerType &&
      !parsed.data.learnerType
    ) {
      return fail("Select your learner type.", 422);
    }

    const currentLearnerType = currentUser.learnerType?.toLowerCase();

    if (
      currentUser.role === UserRole.LEARNER &&
      currentUser.profileCompleted &&
      currentLearnerType &&
      parsed.data.learnerType &&
      parsed.data.learnerType !== currentLearnerType
    ) {
      return fail("Learner type can only be changed by an admin.", 403);
    }

    const profileImage = readImageField(formData, "profileImage");

    if (profileImage) {
      uploadedImage = await uploadImageMedia("user-profile-image", profileImage);
    }

    const updatedUser = await prisma.user.update({
      data: {
        city: parsed.data.city,
        image: uploadedImage?.url ?? (parsed.data.removeProfileImage ? null : currentUser.image),
        imageProvider:
          uploadedImage?.provider ??
          (parsed.data.removeProfileImage ? null : currentUser.imageProvider),
        imageStorageKey:
          uploadedImage?.storageKey ??
          (parsed.data.removeProfileImage ? null : currentUser.imageStorageKey),
        learnerType:
          currentUser.role === UserRole.LEARNER
            ? parsed.data.learnerType
              ? learnerTypeMap[parsed.data.learnerType]
              : currentUser.learnerType
            : currentUser.learnerType,
        mobile: parsed.data.mobile || null,
        name: parsed.data.name,
        profileCompleted:
          currentUser.role === UserRole.LEARNER
            ? true
            : currentUser.profileCompleted,
      },
      where: {
        id: currentUser.id,
      },
    });

    const previousImage = getStoredImageAsset(currentUser);

    if (
      previousImage &&
      (uploadedImage || parsed.data.removeProfileImage) &&
      previousImage.storageKey !== uploadedImage?.storageKey
    ) {
      await deleteStoredMedia(previousImage);
    }

    return ok({ user: toAuthUser(updatedUser) });
  } catch (error) {
    if (uploadedImage) {
      await deleteStoredMedia(uploadedImage);
    }

    if (error instanceof MediaValidationError) {
      return fail(error.message, 422);
    }

    return handleRouteError(error);
  }
}

function getStoredImageAsset(user: {
  image?: string | null;
  imageProvider?: string | null;
  imageStorageKey?: string | null;
}) {
  if (!user.image || !user.imageProvider || !user.imageStorageKey) {
    return null;
  }

  return {
    provider: user.imageProvider,
    storageKey: user.imageStorageKey,
    url: user.image,
  };
}

function readTextField(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value : "";
}

function readOptionalTextField(formData: FormData, field: string) {
  const value = readTextField(formData, field).trim();

  return value || undefined;
}

function readImageField(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" || !value || value.size === 0 ? null : value;
}
