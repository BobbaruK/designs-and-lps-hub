import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { BrandLogoForm } from "@/features/brand-logos/components/form/brand-logo-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
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
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${brandLogosMeta.label.singular}`}
        backBtnHref={brandLogosMeta.href}
      />

      <BrandLogoForm />
    </PageStructure>
  );
};

export default AddBrandLogoPage;
