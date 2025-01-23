import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandsMeta } from "@/constants/page-titles/brands";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { getBrandLogos } from "@/features/brand-logos/data/get-brand-logos";
import { BrandEditForm } from "@/features/brands/components/form/brand-edit";
import { getBrandBySlug } from "@/features/brands/data/get-brand";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      href: brandsMeta.href,
      label: brandsMeta.label.plural,
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    brandId: string;
  }>;
}

const EditLicensePage = async ({ params }: Props) => {
  const { brandId } = await params;

  await redirectUser(brandsMeta.href + "/" + brandId);

  const brand = await getBrandBySlug(brandId);

  if (!brand) notFound();

  const brandHref = `${brandsMeta.href}/${brand.slug}`;

  const brandLogos = await getBrandLogos();

  if (!brandLogos)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Brand Logos").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: brandHref,
          label: "Edit " + brand.name,
        })}
      />
      <PageTtle label={`Edit "${brand.name}"`} backBtnHref={brandHref} />

      <BrandEditForm brand={brand} logos={brandLogos} />
    </PageStructure>
  );
};

export default EditLicensePage;
