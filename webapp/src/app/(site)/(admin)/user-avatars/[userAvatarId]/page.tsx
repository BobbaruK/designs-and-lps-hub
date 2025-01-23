import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";
import { AdminUserAvatarEdit } from "@/features/user-avatars/components/form/user-avatar-edit";
import { getUserAvatarById } from "@/features/user-avatars/data/get-user-avatar";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      label: "Admin",
    },
    {
      href: userAvatarMeta.href,
      label: userAvatarMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    userAvatarId: string;
  }>;
}

const UserAvatarPage = async ({ params }: Props) => {
  const { userAvatarId } = await params;

  const userAvatar = await getUserAvatarById(userAvatarId);

  if (!userAvatar) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: userAvatarMeta.href,
          label: "Edit " + userAvatar.name,
        })}
      />
      <PageTtle
        label={`Edit "${userAvatar.name}"`}
        backBtnHref={userAvatarMeta.href}
      />

      <AdminUserAvatarEdit avatar={userAvatar} />
    </PageStructure>
  );
};

export default UserAvatarPage;
