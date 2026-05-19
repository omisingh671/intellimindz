"use client";

import { Button } from "@/shared/components/ui/Button";
import { Icons } from "@/shared/icons/icon-registry";
import { startSso } from "@/features/auth/services/auth.api";

export function SocialLoginButtons() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button variant="outline" onClick={() => void startSso("google")}>
        <Icons.user className="size-4" />
        Google
      </Button>
      <Button variant="outline" onClick={() => void startSso("linkedin")}>
        <Icons.briefcase className="size-4" />
        LinkedIn
      </Button>
    </div>
  );
}
