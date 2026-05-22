import { z } from "zod";
import { learnerTypeOptions } from "@/features/auth/schemas/signup.schema";

export const profileImageAccept = ["image/jpeg", "image/png", "image/webp"] as const;
export const profileImageMaxBytes = 2 * 1024 * 1024;

const profileFieldsSchema = z.object({
  city: z.string().trim().min(2, "City is required"),
  email: z.string().trim().email(),
  learnerType: z.enum(learnerTypeOptions).optional(),
  mobile: z
    .string()
    .trim()
    .max(20, "Mobile number must be 20 characters or less"),
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
});

export function createProfileSchema(isLearner: boolean) {
  return profileFieldsSchema.superRefine((values, context) => {
    if (isLearner && !values.learnerType) {
      context.addIssue({
        code: "custom",
        message: "Select your learner type",
        path: ["learnerType"],
      });
    }
  });
}

export type ProfileFormValues = z.infer<typeof profileFieldsSchema>;
