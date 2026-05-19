"use client";

import { Button } from "@/shared/components/ui/Button";
import { Icons } from "@/shared/icons/icon-registry";
import { startSso } from "@/features/auth/services/auth.api";

export function EnterpriseLoginButton() {
  return (
    <Button
      variant="secondary"
      className="w-full"
      onClick={() => void startSso("enterprise")}
    >
      <Icons.building className="size-4" />
      Continue with enterprise SSO
    </Button>
  );
}
