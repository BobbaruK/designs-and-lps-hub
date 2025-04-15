import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";
import { AdminUserAvatarEdit } from "@/features/user-avatars/components/form/user-avatar-edit";
import { getUserAvatarById } from "@/features/user-avatars/data/get-user-avatar";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { notFound } from "next/navigation";

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
        crumbs={breadCrumbsFn([
          {
            label: "Admin",
          },
          {
            href: userAvatarMeta.href,
            label: userAvatarMeta.label.plural,
          },
          {
            href: userAvatarMeta.href,
            label: "Edit " + userAvatar.name,
          },
        ])}
      />
      <PageTitle
        label={`Edit "${userAvatar.name}"`}
        backBtnHref={userAvatarMeta.href}
      />

      <AdminUserAvatarEdit avatar={userAvatar} />
    </PageStructure>
  );
};

export default UserAvatarPage;
