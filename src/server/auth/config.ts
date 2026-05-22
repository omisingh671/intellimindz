import bcrypt from "bcryptjs";
import type { Adapter } from "next-auth/adapters";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/server/db/prisma";
import { getAuthProviderEnv, getAuthSecret } from "@/server/config/env";
import { AUTH_ROLES } from "@/shared/constants/auth-roles";

const providerEnv = getAuthProviderEnv();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as Parameters<typeof PrismaAdapter>[0]) as Adapter,
  callbacks: {
    async jwt({ token, user }) {
      const userId = user?.id ?? token.sub;

      if (!userId) {
        return invalidateToken(token);
      }

      const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          city: true,
          email: true,
          id: true,
          image: true,
          isActive: true,
          learnerType: true,
          mobile: true,
          name: true,
          profileCompleted: true,
          role: true,
          sessionVersion: true,
        },
      });

      if (!currentUser?.isActive) {
        return invalidateToken(token);
      }

      if (
        !user &&
        (typeof token.sessionVersion !== "number" ||
          token.sessionVersion !== currentUser.sessionVersion)
      ) {
        return invalidateToken(token);
      }

      token.authInvalid = false;
      token.city = currentUser.city;
      token.email = currentUser.email;
      token.isActive = currentUser.isActive;
      token.learnerType = currentUser.learnerType;
      token.mobile = currentUser.mobile;
      token.name = currentUser.name ?? currentUser.email;
      token.picture = currentUser.image;
      token.profileCompleted = currentUser.profileCompleted;
      token.role = currentUser.role;
      token.sessionVersion = currentUser.sessionVersion;
      token.sub = currentUser.id;

      return token;
    },
    async session({ session, token }) {
      if (
        token.authInvalid ||
        !token.sub ||
        !token.email ||
        !token.role ||
        token.isActive !== true
      ) {
        session.user = {
          ...session.user,
          city: null,
          id: "",
          isActive: false,
          learnerType: null,
          mobile: null,
          profileCompleted: false,
          role: AUTH_ROLES.learner,
        };

        return session;
      }

      session.user = {
        ...session.user,
        city: token.city ?? null,
        email: token.email,
        id: token.sub,
        image: token.picture ?? null,
        isActive: true,
        learnerType: token.learnerType ?? null,
        mobile: token.mobile ?? null,
        name: token.name ?? token.email,
        profileCompleted: token.profileCompleted === true,
        role: token.role,
      };

      return session;
    },
    async signIn({ account, user }) {
      if (account?.provider !== "credentials") {
        if (!user.email) {
          return false;
        }

        const email = user.email.trim().toLowerCase();
        const existingUser = await prisma.user.findUnique({
          where: { email },
          select: { isActive: true },
        });

        if (existingUser?.isActive === false) {
          return false;
        }

        user.email = email;
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      name: "Email and password",
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user?.isActive || !user.passwordHash) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
          return null;
        }

        return {
          city: user.city,
          email: user.email,
          id: user.id,
          image: user.image,
          isActive: user.isActive,
          learnerType: user.learnerType,
          mobile: user.mobile,
          name: user.name ?? user.email,
          profileCompleted: user.profileCompleted,
          role: user.role,
          sessionVersion: user.sessionVersion,
        };
      },
    }),
    ...(providerEnv.google.clientId && providerEnv.google.clientSecret
      ? [
          GoogleProvider({
            allowDangerousEmailAccountLinking: true,
            clientId: providerEnv.google.clientId,
            clientSecret: providerEnv.google.clientSecret,
          }),
        ]
      : []),
    ...(providerEnv.github.clientId && providerEnv.github.clientSecret
      ? [
          GitHubProvider({
            allowDangerousEmailAccountLinking: true,
            clientId: providerEnv.github.clientId,
            clientSecret: providerEnv.github.clientSecret,
          }),
        ]
      : []),
    ...(providerEnv.linkedin.clientId && providerEnv.linkedin.clientSecret
      ? [
          LinkedInProvider({
            allowDangerousEmailAccountLinking: true,
            clientId: providerEnv.linkedin.clientId,
            clientSecret: providerEnv.linkedin.clientSecret,
          }),
        ]
      : []),
  ],
  secret: getAuthSecret(),
  session: {
    strategy: "jwt",
  },
};

function invalidateToken(token: JWT) {
  token.authInvalid = true;
  token.city = undefined;
  token.email = undefined;
  token.isActive = false;
  token.learnerType = undefined;
  token.mobile = undefined;
  token.name = undefined;
  token.picture = undefined;
  token.profileCompleted = false;
  token.role = undefined;
  token.sessionVersion = undefined;
  token.sub = undefined;

  return token;
}
