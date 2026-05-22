"use client";

import Image from "next/image";
import type { Session } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";

import { learnerTypeOptions } from "@/features/auth/schemas/signup.schema";
import {
  createProfileSchema,
  profileImageAccept,
  profileImageMaxBytes,
  type ProfileFormValues,
} from "@/features/account/schemas/profile.schema";

import { Button } from "@/shared/components/ui/Button";
import { FormError } from "@/shared/components/ui/FormError";
import { Input } from "@/shared/components/ui/Input";
import { AUTH_ROLES } from "@/shared/constants/auth-roles";
import { Icons } from "@/shared/icons/icon-registry";

import { useUpdateProfileMutation } from "@/features/account/hooks";

import { useAppSubmit } from "@/shared/hooks/useAppSubmit";

import { cn } from "@/shared/lib/utils";

export function ProfileForm() {
  const router = useRouter();
  const submit = useAppSubmit();
  const updateProfileMutation = useUpdateProfileMutation();
  const { data: session, status, update } = useSession();
  const user = session?.user;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [shouldRemoveImage, setShouldRemoveImage] = useState(false);

  const isLearner = user?.role === AUTH_ROLES.learner;
  const isIncompleteLearner = isLearner && user?.profileCompleted !== true;
  const isLearnerTypeLocked =
    isLearner && user?.profileCompleted === true && Boolean(user?.learnerType);
  const visibleImage = shouldRemoveImage
    ? null
    : (imagePreview ?? user?.image ?? null);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ProfileFormValues>({
    defaultValues: getDefaultValues(user),
    resolver: zodResolver(
      createProfileSchema(isLearner && !isLearnerTypeLocked),
    ),
  });

  useEffect(() => {
    reset(getDefaultValues(user));
  }, [reset, user]);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const image = event.target.files?.[0];

    if (!image) {
      return;
    }

    if (
      !profileImageAccept.includes(
        image.type as (typeof profileImageAccept)[number],
      )
    ) {
      setImageError("Choose a JPEG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (image.size > profileImageMaxBytes) {
      setImageError("Profile picture must be 2 MB or less.");
      event.target.value = "";
      return;
    }

    setImageError(null);
    setSelectedImage(image);
    setImagePreview(URL.createObjectURL(image));
    setShouldRemoveImage(false);
  }

  function handleRemoveImage() {
    setImageError(null);
    setSelectedImage(null);
    setImagePreview(null);
    setShouldRemoveImage(Boolean(user?.image));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function onSubmit(values: ProfileFormValues) {
    void submit.runSubmit({
      action: () =>
        updateProfileMutation.mutateAsync({
          city: values.city,
          learnerType: isLearnerTypeLocked ? undefined : values.learnerType,
          mobile: values.mobile,
          name: values.name,
          profileImage: selectedImage ?? undefined,
          removeProfileImage: shouldRemoveImage,
        }),
      errorMessage: "Unable to update profile right now.",
      onSuccess: async () => {
        setSelectedImage(null);
        setImagePreview(null);
        setShouldRemoveImage(false);

        await update();
        router.refresh();
      },
      successMessage: "Profile updated.",
    });
  }

  if (status === "loading") {
    return (
      <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
        <p className="text-sm font-semibold text-slate-500">
          Loading profile...
        </p>
      </section>
    );
  }

  return (
    <form
      className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 sm:p-7"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {isIncompleteLearner ? (
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          Complete your learner details here so future enrolment and support
          workflows have the right profile information.
        </div>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Full name
              </label>
              <Input
                id="profile-name"
                autoComplete="name"
                placeholder="Your full name"
                {...register("name")}
              />
              <FormError message={errors.name?.message} />
            </div>
            <div>
              <label
                htmlFor="profile-email"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Email address
              </label>
              <Input
                id="profile-email"
                type="email"
                autoComplete="email"
                readOnly
                className="cursor-not-allowed bg-slate-100 text-slate-500"
                {...register("email")}
              />
              <FormError message={errors.email?.message} />
            </div>
            <div>
              <label
                htmlFor="profile-mobile"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Mobile no{" "}
                <span className="font-medium text-slate-400">(optional)</span>
              </label>
              <Input
                id="profile-mobile"
                type="tel"
                autoComplete="tel"
                placeholder="Mobile number"
                {...register("mobile")}
              />
              <FormError message={errors.mobile?.message} />
            </div>
            <div>
              <label
                htmlFor="profile-city"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                City
              </label>
              <Input
                id="profile-city"
                autoComplete="address-level2"
                placeholder="Your city"
                {...register("city")}
              />
              <FormError message={errors.city?.message} />
            </div>
            {isLearner ? (
              <div>
                <label
                  htmlFor="profile-learner-type"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Learner type
                </label>
                <select
                  id="profile-learner-type"
                  disabled={isLearnerTypeLocked}
                  className={cn(
                    "min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100",
                    isLearnerTypeLocked &&
                      "cursor-not-allowed bg-slate-100 text-slate-500",
                    errors.learnerType &&
                      "border-red-300 focus:border-red-400 focus:ring-red-100",
                  )}
                  {...register("learnerType")}
                >
                  <option value="">Select learner type</option>
                  {learnerTypeOptions.map((learnerType) => (
                    <option key={learnerType} value={learnerType}>
                      {formatLearnerType(learnerType)}
                    </option>
                  ))}
                </select>
                <FormError message={errors.learnerType?.message} />
                {isLearnerTypeLocked ? (
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Learner type is locked after profile completion. Contact an
                    admin to change it.
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-500">
                  Account role
                </p>
                <p className="mt-1 text-sm font-bold text-slate-950">
                  {formatRole(user?.role)}
                </p>
              </div>
            )}
          </div>
        </section>
        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <ProfileAvatar
              image={visibleImage}
              name={user?.name}
              email={user?.email}
            />
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-slate-950">
                {user?.name?.trim() || "Your profile"}
              </p>
              <p className="mt-1 truncate text-sm font-medium text-slate-500">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept={profileImageAccept.join(",")}
              className="sr-only"
              onChange={handleImageChange}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Icons.upload className="size-4" />
              {visibleImage ? "Replace picture" : "Choose picture"}
            </Button>
            {visibleImage ? (
              <Button
                type="button"
                variant="ghost"
                className="w-full text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                onClick={handleRemoveImage}
              >
                <Icons.trash className="size-4" />
                Remove picture
              </Button>
            ) : null}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            Optional JPEG, PNG, or WebP picture up to 2 MB. Save your profile to
            apply picture changes.
          </p>
          {shouldRemoveImage ? (
            <p className="mt-3 text-sm font-semibold text-rose-700">
              Picture will be removed when you save your profile.
            </p>
          ) : null}
          {imageError ? <FormError message={imageError} /> : null}
        </aside>
      </div>
      <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-500">
          Email changes stay locked to the account security flow.
        </p>
        <Button type="submit" disabled={submit.isSubmitting}>
          {submit.isSubmitting ? "Saving..." : "Save Profile"}
        </Button>
      </div>
      {submit.errorMessage ? (
        <p className="mt-3 text-sm font-medium text-red-600">
          {submit.errorMessage}
        </p>
      ) : null}
    </form>
  );
}

type ProfileAvatarProps = {
  email?: string | null;
  image: string | null;
  name?: string | null;
};

function ProfileAvatar({ email, image, name }: ProfileAvatarProps) {
  const label = name?.trim() || email?.trim() || "Account";

  return (
    <span className="relative grid size-20 shrink-0 overflow-hidden rounded-full bg-[#0d183d] text-2xl font-bold text-white shadow-sm shadow-slate-950/15">
      {image ? (
        <Image
          src={image}
          alt={`${label} profile picture`}
          fill
          unoptimized
          sizes="80px"
          className="object-cover"
        />
      ) : (
        <span className="m-auto">{label.charAt(0).toUpperCase()}</span>
      )}
    </span>
  );
}

function getDefaultValues(user: Session["user"] | undefined) {
  return {
    city: user?.city ?? "",
    email: user?.email ?? "",
    learnerType:
      user?.learnerType?.toLowerCase() as ProfileFormValues["learnerType"],
    mobile: user?.mobile ?? "",
    name: user?.name ?? "",
  };
}

function formatLearnerType(learnerType: string) {
  return learnerType.charAt(0).toUpperCase() + learnerType.slice(1);
}

function formatRole(role?: string) {
  if (!role) {
    return "Account";
  }

  return role
    .toLowerCase()
    .split("_")
    .map((part) => formatLearnerType(part))
    .join(" ");
}
