import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { currentUser } from "@/features/auth/lib/auth";
import { SettingsForm } from "@/features/settings/components";
import { getUserAvatars } from "@/features/user-avatars/data/get-user-avatars";
import { getUserById } from "@/features/users/data/get-user";
import { IBreadcrumb } from "@/types";
import { Suspense } from "react";

const SettingsPage = async () => {
  const BREADCRUMBS: IBreadcrumb[] = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/settings",
      label: "Settings",
    },
  ];

  const userAvatars = await getUserAvatars();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Settings" />
      <SettingsForm avatars={userAvatars} />
    </PageStructure>
  );
};

export default SettingsPage;
