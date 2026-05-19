import { z } from "zod";

export const donationInterestSchema = z.object({
  amount: z.string().min(1, "Select or enter an amount"),
  firstName: z.string().trim().min(2, "First name is required"),
  lastName: z.string().trim().min(2, "Last name is required"),
  email: z.string().trim().email("Enter a valid email address"),
});

export type DonationInterestValues = z.infer<typeof donationInterestSchema>;
