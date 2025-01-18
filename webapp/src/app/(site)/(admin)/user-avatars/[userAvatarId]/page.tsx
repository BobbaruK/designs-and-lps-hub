import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { AdminUserAvatarEdit } from "@/features/user-avatars/components/form/user-avatar-edit";
import { getUserAvatarById } from "@/features/user-avatars/data/get-user-avatar";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Admin",
    },
    {
      href: "/user-avatar",
      label: "User Avatars",
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
          href: `/user-avatars/${userAvatar.id}`,
          label: userAvatar.name,
        })}
      />
      <PageTtle
        label={`Edit User Avatar "${userAvatar?.name || "Unknown"}"`}
        backBtnHref="/user-avatars"
      />

      <AdminUserAvatarEdit avatar={userAvatar} />
    </PageStructure>
  );
};

export default UserAvatarPage;
