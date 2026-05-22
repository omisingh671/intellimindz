"use client";

import { useMutation } from "@tanstack/react-query";
import {
  updateProfile,
  type UpdateProfilePayload,
} from "@/features/account/services/profile.api";

export function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
  });
}
