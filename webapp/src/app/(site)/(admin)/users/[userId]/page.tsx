import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { getUserById } from "@/features/auth/data";
import { getUserAvatars } from "@/features/user-avatars/data/get-user-avatars";
import { UserEditForm } from "@/features/users/components/form/user-edit";
import { IBreadcrumb } from "@/types";

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

interface Props {
  params: Promise<{
    userId: string;
  }>;
}

const UserPage = async ({ params }: Props) => {
  const { userId } = await params;

  const user = await getUserById(userId);

  const avatars = await getUserAvatars();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/users/${userId}`,
          label: user?.name || "User not found",
        })}
      />
      <PageTtle
        label={`Edit user "${user?.name || "User not found"}"`}
        backBtnHref="/users"
      />

      {!user ? (
        <CustomAlert
          title={"Error!"}
          description={`Seems like the user that you are looking for does not exist.`}
          variant="destructive"
        />
      ) : (
        <UserEditForm user={user} avatars={avatars} />
      )}
    </PageStructure>
  );
};

export default UserPage;
