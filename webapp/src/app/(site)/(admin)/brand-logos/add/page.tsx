import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { BrandLogoForm } from "@/features/brand-logos/components/form/brand-logo-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: brandLogosMeta.href,
    label: brandLogosMeta.label.plural,
  },
  {
    href: `${brandLogosMeta.href}/add`,
    label: `Add ${brandLogosMeta.label.singular}`,
  },
];

const AddBrandLogoPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTtle
        label={`Add ${brandLogosMeta.label.singular}`}
        backBtnHref={brandLogosMeta.href}
      />

      <BrandLogoForm />
    </PageStructure>
  );
};

export default AddBrandLogoPage;
