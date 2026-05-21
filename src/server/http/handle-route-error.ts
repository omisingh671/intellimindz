import { fail } from "@/server/http/responses";

export function handleRouteError(error: unknown) {
  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") {
      return fail("Login required.", 401);
    }

    if (error.message === "FORBIDDEN") {
      return fail("You do not have permission to perform this action.", 403);
    }
  }

  return fail("Something went wrong. Please try again.", 500);
}
