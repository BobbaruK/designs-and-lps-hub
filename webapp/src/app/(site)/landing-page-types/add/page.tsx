import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { LandingPageTypeAddForm } from "@/features/landing-page-types/components/form/landing-page-type-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/landing-page-types",
    label: "Landing Page Types",
  },
  {
    href: "/landing-page-types/add",
    label: "Add Landing Page Type",
  },
];

const AddLandingPageTypePage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label="Add Landing Page Type"
        backBtnHref="/landing-page-types"
      />

      <LandingPageTypeAddForm />
    </PageStructure>
  );
};

export default AddLandingPageTypePage;
