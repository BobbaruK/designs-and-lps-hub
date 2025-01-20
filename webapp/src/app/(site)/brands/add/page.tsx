import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { getBrandLogos } from "@/features/brand-logos/data/get-brand-logos";
import { BrandAddForm } from "@/features/brands/components/form/brand-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/brands",
    label: "Brands",
  },
  {
    href: "/brands/add",
    label: "Add Brand",
  },
];

const AddBrandPage = async () => {
  const brandlogos = await getBrandLogos();

  if (!brandlogos)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Brands").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Add Brand" backBtnHref="/brands" />

      <BrandAddForm logos={brandlogos} />
    </PageStructure>
  );
};

export default AddBrandPage;
