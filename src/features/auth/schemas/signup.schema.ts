import { z } from "zod";

export const learnerTypeOptions = ["student", "professional", "regulator"] as const;

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Enter a valid email address"),
    mobile: z
      .string()
      .trim()
      .max(20, "Mobile number must be 20 characters or less")
      .optional(),
    city: z.string().trim().min(2, "City is required"),
    learnerType: z.enum(learnerTypeOptions, {
      error: "Select your learner type",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
