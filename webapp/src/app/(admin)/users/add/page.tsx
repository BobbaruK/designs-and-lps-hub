import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { UserAddForm } from "@/features/users/components/form/user-add";
import { IBreadcrumb } from "@/types";

const BREADCRUMBS: IBreadcrumb[] = [
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
    href: "/users/add",
    label: "Add User",
  },
];

const AddUserPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={"Add User"} backBtnHref="/users" />
      <UserAddForm avatars={null} />
    </PageStructure>
  );
};

export default AddUserPage;
