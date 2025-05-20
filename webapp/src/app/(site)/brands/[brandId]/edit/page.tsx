import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { brandsMeta } from "@/constants/page-titles/brands";
import { getBrandLogos } from "@/features/brand-logos/data/get-brand-logos";
import { BrandEditForm } from "@/features/brands/components/form/brand-edit";
import { getBrandBySlug } from "@/features/brands/data/get-brand";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    brandId: string;
  }>;
}

const EditLicensePage = async ({ params }: Props) => {
  const { brandId } = await params;

  const brandHref = `${brandsMeta.href}/${brandId}`;

  await redirectUser(brandHref);

  const brand = await getBrandBySlug({
    slug: brandId,
  });

  if (!brand) notFound();

  const brandLogos = await getBrandLogos({});

  if (!brandLogos)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES(brandLogosMeta.label.plural).CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: brandsMeta.href,
            label: capitalizeFirstLetter(brandsMeta.label.plural),
          },
          {
            href: brandHref,
            label: `Edit ${brandsMeta.label.singular.toLowerCase()} "${brand.name}"`,
          },
        ])}
      />
      <PageTitle
        label={`Edit ${brandsMeta.label.singular.toLowerCase()} "${brand.name}"`}
        backBtnHref={brandHref}
      />

      <BrandEditForm brand={brand} logos={brandLogos} />
    </PageStructure>
  );
};

export default EditLicensePage;
