import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { brandsMeta } from "@/constants/page-titles/brands";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { getBrandLogos } from "@/features/brand-logos/data/get-brand-logos";
import { BrandAddForm } from "@/features/brands/components/form/brand-add";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: brandsMeta.href,
    label: brandsMeta.label.plural,
  },
  {
    href: `${brandsMeta.href}/add`,
    label: `Add ${brandsMeta.label.singular}`,
  },
];

const AddBrandPage = async () => {
  await redirectUser(brandsMeta.href);

  const brandlogos = await getBrandLogos();

  if (!brandlogos)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(brandLogosMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${brandsMeta.label.singular}`}
        backBtnHref={brandsMeta.href}
      />

      <BrandAddForm logos={brandlogos} />
    </PageStructure>
  );
};

export default AddBrandPage;
