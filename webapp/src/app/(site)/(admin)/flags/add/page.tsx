import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { FlagAddForm } from "@/features/flags/components/form/flag-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const AddFlagPage = () => {
  const BREADCRUMBS: IBreadcrumb[] = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Admin",
    },
    {
      href: "/flags",
      label: "Flags",
    },
    {
      href: "/user-avatars/add",
      label: "Add Flag",
    },
  ];

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={`Add Flag`} backBtnHref="/flags" />

      <FlagAddForm />
    </PageStructure>
  );
};

export default AddFlagPage;
