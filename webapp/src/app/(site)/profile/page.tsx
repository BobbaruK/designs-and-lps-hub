import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { profileMeta } from "@/constants/page-titles/profile";
import { currentUser } from "@/features/auth/lib/auth";
import { UserDataSection } from "@/features/profile/components/user-data-section";
import { getUserById } from "@/features/users/data/get-user";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      label: profileMeta.label.singular,
    },
    {
      href,
      label,
    },
  ];
};

const MyProfilePage = async () => {
  const sessionUser = await currentUser();

  const user =
    sessionUser && sessionUser.id ? await getUserById(sessionUser.id) : null;

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
          description={ACTION_MESSAGES(profileMeta.label.singular).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <>
          <UserDataSection user={user} />
        </>
      )}
    </PageStructure>
  );
};

export default MyProfilePage;
