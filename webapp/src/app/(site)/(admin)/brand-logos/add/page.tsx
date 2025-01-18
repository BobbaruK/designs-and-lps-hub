import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { BrandLogoForm } from "@/features/brand-logos/components/form/brand-logo-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    label: "Admin",
  },
  {
    href: "/brand-logos",
    label: "Brand Logos",
  },
  {
    href: "/brand-logos/add",
    label: "Add Brand Logo",
  },
];

const AddBrandLogoPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={`Add Brand Logo`} backBtnHref="/brand-logos" />

      <BrandLogoForm />
    </PageStructure>
  );
};

export default AddBrandLogoPage;
