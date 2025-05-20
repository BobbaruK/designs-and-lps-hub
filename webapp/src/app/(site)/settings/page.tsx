import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { SettingsForm } from "@/features/settings/components/settings-form";
import { getUserAvatars } from "@/features/user-avatars/data/get-user-avatars";
import { IBreadcrumb } from "@/types/breadcrumb";

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

  const userAvatars = await getUserAvatars({});

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTitle label="Settings" />
      <SettingsForm avatars={userAvatars} />
    </PageStructure>
  );
};

export default SettingsPage;
