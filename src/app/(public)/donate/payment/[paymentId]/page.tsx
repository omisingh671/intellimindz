import type { Metadata } from "next";
import { DonationPaymentPlaceholderPage } from "@/features/donation/components/DonationPaymentPlaceholderPage";

type PageProps = {
  params: Promise<{
    paymentId: string;
  }>;
};

export const metadata: Metadata = {
  title: "Donation Payment",
};

export default async function Page({ params }: PageProps) {
  const { paymentId } = await params;

  return <DonationPaymentPlaceholderPage paymentId={paymentId} />;
}
