"use client";

import { Button } from "@/shared/components/ui/Button";
import { useSsoMutation } from "@/features/auth/hooks";
import { Icons } from "@/shared/icons/icon-registry";

export function EnterpriseLoginButton() {
  const ssoMutation = useSsoMutation();

  return (
    <Button
      variant="secondary"
      className="w-full"
      disabled={ssoMutation.isPending}
      onClick={() => ssoMutation.mutate("enterprise")}
    >
      <Icons.building className="size-4" />
      {ssoMutation.isPending ? "Connecting..." : "Continue with enterprise SSO"}
    </Button>
  );
}
