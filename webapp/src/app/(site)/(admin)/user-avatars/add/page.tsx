import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";
import { UserAvatarAdd } from "@/features/user-avatars/components/form/user-avatar-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: userAvatarMeta.href,
    label: userAvatarMeta.label.plural,
  },
  {
    href: `${userAvatarMeta.href}/add`,
    label: `Add ${userAvatarMeta.label.singular}`,
  },
];

const AddUserAvatarPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTtle
        label={`Add ${userAvatarMeta.label.singular}`}
        backBtnHref={userAvatarMeta.href}
      />

      <UserAvatarAdd />
    </PageStructure>
  );
};

export default AddUserAvatarPage;
