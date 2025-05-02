import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { brandsMeta } from "@/constants/page-titles/brands";
import { BrandResourceEditForm } from "@/features/brand-resources/components/form/brand-resource-edit";
import { getBrandResourceById } from "@/features/brand-resources/data/get-brand-resource";
import { getBrands } from "@/features/brands/data/get-brands";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    brandResourceId: string;
  }>;
}

const BrandResourcePage = async ({ params }: Props) => {
  const { brandResourceId } = await params;

  const brandResource = await getBrandResourceById(brandResourceId);

  if (!brandResource) notFound();

  //
  const brands = await getBrands({});
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
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            label: "Admin",
          },
          {
            href: brandResourcesMeta.href,
            label: capitalizeFirstLetter(brandResourcesMeta.label.plural),
          },
          {
            href: brandResourcesMeta.href,
            label: `Edit "${brandResource.name}"`,
          },
        ])}
      />
      <PageTitle
        label={`Edit "${brandResource.name}"`}
        backBtnHref={brandResourcesMeta.href}
      />

      <BrandResourceEditForm brandResource={brandResource} brands={brands} />
    </PageStructure>
  );
};

export default BrandResourcePage;
