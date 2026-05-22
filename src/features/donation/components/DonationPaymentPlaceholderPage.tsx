import { notFound } from "next/navigation";
import { ButtonLink } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";
import { ConfirmPlaceholderPaymentButton } from "@/features/payments/components/ConfirmPlaceholderPaymentButton";
import { getPublicPaymentPlaceholder } from "@/features/payments/services/placeholder-payment.service";

type DonationPaymentPlaceholderPageProps = {
  paymentId: string;
};

export async function DonationPaymentPlaceholderPage({
  paymentId,
}: DonationPaymentPlaceholderPageProps) {
  const payment = await getPublicPaymentPlaceholder(paymentId);

  if (!payment || payment.purpose !== "DONATION") {
    notFound();
  }

  return (
    <main className="bg-blue-50/60 py-16 sm:py-20">
      <Container>
        <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              <Icons.check className="size-6" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-900/45">
                Placeholder Created
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
                {payment.status === "PAID"
                  ? "Donation payment is confirmed"
                  : "Confirm your donation payment"}
              </h1>
              <p className="mt-4 text-sm leading-7 text-blue-950/70">
                {payment.status === "PAID"
                  ? "This payment record is marked paid in the system. Real gateway collection will be connected later."
                  : "Review the placeholder record and confirm it locally. Real gateway collection will be connected later."}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <PaymentDetail label="Payment ID" value={payment.id} />
            {payment.status === "PAID" ? (
              <PaymentDetail label="Status" value={formatStatus(payment.status)} />
            ) : null}
            <PaymentDetail label="Amount" value={formatAmount(payment.amountMinor)} />
            <PaymentDetail label="Mode" value={formatStatus(payment.mode)} />
            <PaymentDetail label="Payer" value={payment.payerName} />
            <PaymentDetail label="Email" value={payment.payerEmail} />
          </div>

          {payment.status === "PENDING" ? (
            <div className="mt-8">
              <ConfirmPlaceholderPaymentButton paymentId={payment.id} />
            </div>
          ) : null}

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm font-semibold leading-6 text-blue-950/80">
              Real payment gateway integration is still pending. When Razorpay
              or another gateway is added, this page can become the handoff
              point for completing and verifying the payment.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/donate">
              Back to Donate
              <Icons.arrowRight className="size-4 rotate-180" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact Team
            </ButtonLink>
          </div>
        </section>
      </Container>
    </main>
  );
}

type PaymentDetailProps = {
  label: string;
  value: string;
};

function PaymentDetail({ label, value }: PaymentDetailProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase text-blue-900/40">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}

function formatAmount(amountMinor: number) {
  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
  }).format(amountMinor / 100);
}

function formatStatus(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
