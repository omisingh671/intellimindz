import type { Metadata } from "next";
import { PaymentPlaceholderPage } from "@/features/payments/components/PaymentPlaceholderPage";

type PageProps = {
  params: Promise<{
    paymentId: string;
  }>;
};

export const metadata: Metadata = {
  title: "Payment Placeholder",
};

export default async function Page({ params }: PageProps) {
  const { paymentId } = await params;

  return <PaymentPlaceholderPage paymentId={paymentId} />;
}
