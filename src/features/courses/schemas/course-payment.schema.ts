import { z } from "zod";

export const coursePaymentSchema = z.object({
  payerName: z.string().trim().min(2, "Name must be at least 2 characters"),
  payerEmail: z.string().trim().email("Enter a valid email address"),
  payerMobile: z.string().trim().max(20).optional(),
});

export type CoursePaymentValues = z.infer<typeof coursePaymentSchema>;
