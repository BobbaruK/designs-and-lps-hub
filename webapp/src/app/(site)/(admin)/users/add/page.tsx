import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";
import { usersMeta } from "@/constants/page-titles/users";
import { getUserAvatars } from "@/features/user-avatars/data/get-user-avatars";
import { UserAddForm } from "@/features/users/components/form/user-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
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
    href: `${usersMeta.href}/add`,
    label: `Add ${usersMeta.label.singular}`,
  },
];

const AddUserPage = async () => {
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
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${usersMeta.label.singular}`}
        backBtnHref={usersMeta.href}
      />
      <UserAddForm avatars={avatars} />
    </PageStructure>
  );
};

export default AddUserPage;
