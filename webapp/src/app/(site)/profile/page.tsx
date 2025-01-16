import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { currentUser } from "@/features/auth/lib/auth";
import { UserDataSection } from "@/features/profile/components/user-data-section";
import { getUserById } from "@/features/users/data/get-user";
import { IBreadcrumb } from "@/types";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Profile",
    },
    {
      href,
      label,
    },
  ];
};

const MyProfilePage = async () => {
  const sessionUser = await currentUser();

  const user = sessionUser ? await getUserById(sessionUser.id!) : null;

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          label: user?.name || "Unknown",
          href: "/profile",
        })}
      />
      <PageTtle label={user?.name || "Unknown"} />

      {!user ? (
        <CustomAlert
          title={"Error!"}
          description={`Something went wrong. This user does not return any data.`}
          variant="destructive"
        />
      ) : (
        <UserDataSection user={user} />
      )}
    </PageStructure>
  );
};

export default MyProfilePage;
