import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { getDesignAvatars } from "@/features/design-avatars/data/get-design-avatars";
import { DesignAddForm } from "@/features/designs/components/form/designs-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/designs",
    label: "Designs",
  },
  {
    href: "/designs/add",
    label: "Add Design",
  },
];

const AddBrandPage = async () => {
  const designAvatars = await getDesignAvatars();

  if (!designAvatars)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Design Avatars").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Add Design" backBtnHref="/designs" />

      <DesignAddForm designAvatars={designAvatars} />
    </PageStructure>
  );
};

export default AddBrandPage;
