import type { ApiEnvelope } from "@/server/http/responses";
import type { ProfileFormValues } from "@/features/account/schemas/profile.schema";
import { API_ENDPOINTS } from "@/shared/api/api-endpoints";
import { apiRawClient } from "@/shared/api/api-client";

export type UpdateProfilePayload = Omit<ProfileFormValues, "email"> & {
  profileImage?: File;
  removeProfileImage: boolean;
};

type UpdateProfileResponse = {
  user: {
    city?: string;
    email: string;
    id: string;
    image?: string;
    isActive: boolean;
    learnerType?: string;
    mobile?: string;
    name: string;
    profileCompleted: boolean;
    role: string;
  };
};

export async function updateProfile(payload: UpdateProfilePayload) {
  const formData = new FormData();

  formData.set("city", payload.city);
  formData.set("learnerType", payload.learnerType ?? "");
  formData.set("mobile", payload.mobile);
  formData.set("name", payload.name);
  formData.set("removeProfileImage", String(payload.removeProfileImage));

  if (payload.profileImage) {
    formData.set("profileImage", payload.profileImage);
  }

  const response = await apiRawClient.patch<ApiEnvelope<UpdateProfileResponse>>(
    API_ENDPOINTS.account.profile,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (!response.data.data) {
    throw new Error(response.data.message ?? "Unable to update profile.");
  }

  return response.data.data;
}
