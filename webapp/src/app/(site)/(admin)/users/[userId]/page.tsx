import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { getUserById } from "@/features/auth/data/user";
import { getUserAvatars } from "@/features/user-avatars/data/get-user-avatars";
import { UserEditForm } from "@/features/users/components/form/user-edit";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    userId: string;
  }>;
}

const UserPage = async ({ params }: Props) => {
  const { userId } = await params;

  const user = await getUserById(userId);

  const avatars = await getUserAvatars();

  if (!user) notFound();

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
        href: "/users",
        label: "Users",
      },
      {
        href,
        label,
      },
    ];
  };

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/users/${userId}`,
          label: user.name,
        })}
      />
      <PageTtle label={`Edit user "${user?.name}"`} backBtnHref="/users" />

      <UserEditForm user={user} avatars={avatars} />
    </PageStructure>
  );
};

export default UserPage;
