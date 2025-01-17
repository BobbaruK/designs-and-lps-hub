import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { UserAvatarAdd } from "@/features/user-avatars/components/form/user-avatar-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const AddUserAvatarPage = () => {
  const BREADCRUMBS: IBreadcrumb[] = [
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
      href: "/user-avatars/add",
      label: "Add User Avatar",
    },
  ];

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={`Add User Avatar`} backBtnHref="/user-avatars" />

      <UserAvatarAdd />
    </PageStructure>
  );
};

export default AddUserAvatarPage;
