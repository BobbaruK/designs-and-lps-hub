import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";
import { usersMeta } from "@/constants/page-titles/users";
import { getUserById } from "@/features/auth/data/user";
import { getUserAvatars } from "@/features/user-avatars/data/get-user-avatars";
import { UserEditForm } from "@/features/users/components/form/user-edit";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    userId: string;
  }>;
}

const UserPage = async ({ params }: Props) => {
  const { userId } = await params;

  const user = await getUserById(userId);

  if (!user) notFound();

  const avatars = await getUserAvatars();

  if (!avatars)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(userAvatarMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            label: "Admin",
          },
          {
            href: usersMeta.href,
            label: usersMeta.label.plural,
          },
          {
            href: usersMeta.href,
            label: "Edit " + user.name,
          },
        ])}
      />
      <PageTtle label={`Edit "${user.name}"`} backBtnHref={usersMeta.href} />

      <UserEditForm user={user} avatars={avatars} />
    </PageStructure>
  );
};

export default UserPage;
