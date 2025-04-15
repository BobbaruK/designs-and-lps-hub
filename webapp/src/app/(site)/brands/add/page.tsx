import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { brandsMeta } from "@/constants/page-titles/brands";
import { getBrandLogos } from "@/features/brand-logos/data/get-brand-logos";
import { BrandAddForm } from "@/features/brands/components/form/brand-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: brandsMeta.href,
    label: capitalizeFirstLetter(brandsMeta.label.plural),
  },
  {
    href: `${brandsMeta.href}/add`,
    label: `Add ${brandsMeta.label.singular.toLowerCase()}`,
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
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTtle
        label={`Add ${brandsMeta.label.singular.toLowerCase()}`}
        backBtnHref={brandsMeta.href}
      />

      <BrandAddForm logos={brandlogos} />
    </PageStructure>
  );
};

export default AddBrandPage;
