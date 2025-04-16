import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { brandsMeta } from "@/constants/page-titles/brands";
import { BrandResourceAddForm } from "@/features/brand-resources/components/form/brand-resource-add";
import { getBrands } from "@/features/brands/data/get-brands";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: brandResourcesMeta.href,
    label: capitalizeFirstLetter(brandResourcesMeta.label.plural),
  },
  {
    href: `${brandResourcesMeta.href}/add`,
    label: `Add ${brandResourcesMeta.label.singular.toLowerCase()}`,
  },
];

const AddBrandResourcePage = async () => {
  //
  const brands = await getBrands();
  if (!brands)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(brandsMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={`Add ${brandResourcesMeta.label.singular.toLowerCase()}`}
        backBtnHref={brandResourcesMeta.href}
      />

      <BrandResourceAddForm brands={brands} />
    </PageStructure>
  );
};

export default AddBrandResourcePage;
