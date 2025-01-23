import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";
import { usersMeta } from "@/constants/page-titles/users";
import { getUserById } from "@/features/auth/data/user";
import { getUserAvatars } from "@/features/user-avatars/data/get-user-avatars";
import { UserEditForm } from "@/features/users/components/form/user-edit";
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
      href: usersMeta.href,
      label: usersMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

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
        crumbs={BREADCRUMBS({
          href: usersMeta.href,
          label: "Edit " + user.name,
        })}
      />
      <PageTtle label={`Edit "${user.name}"`} backBtnHref={usersMeta.href} />

      <UserEditForm user={user} avatars={avatars} />
    </PageStructure>
  );
};

export default UserPage;
