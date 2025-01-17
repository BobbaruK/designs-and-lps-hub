import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { AddDesignAvatarForm } from "@/features/design-avatars/components/form/design-avatar-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const AddDesignAvatarPage = () => {
  const BREADCRUMBS: IBreadcrumb[] = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Admin",
    },
    {
      href: "/design-avatars",
      label: "Design Avatars",
    },
    {
      href: "/design-avatars/add",
      label: "Add Design Avatar",
    },
  ];

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={`Add Design Avatar`} backBtnHref="/design-avatars" />

      <AddDesignAvatarForm />
    </PageStructure>
  );
};

export default AddDesignAvatarPage;
