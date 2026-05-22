import type { DefaultSession, DefaultUser } from "next-auth";
import type { LearnerType, UserRole } from "@/generated/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      city: string | null;
      id: string;
      isActive: boolean;
      learnerType: LearnerType | null;
      mobile: string | null;
      profileCompleted: boolean;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    city?: string | null;
    isActive: boolean;
    learnerType?: LearnerType | null;
    mobile?: string | null;
    profileCompleted: boolean;
    role: UserRole;
    sessionVersion: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    authInvalid?: boolean;
    city?: string | null;
    isActive?: boolean;
    learnerType?: LearnerType | null;
    mobile?: string | null;
    profileCompleted?: boolean;
    role?: UserRole;
    sessionVersion?: number;
  }
}
