import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { BrandLogoEditForm } from "@/features/brand-logos/components/form/brand-logo-edit";
import { getBrandLogoById } from "@/features/brand-logos/data/get-brand-logo";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    brandLogoId: string;
  }>;
}

const BrandLogoPage = async ({ params }: Props) => {
  const { brandLogoId } = await params;

  const brandLogo = await getBrandLogoById(brandLogoId);

  if (!brandLogo) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            label: "Admin",
          },
          {
            href: brandLogosMeta.href,
            label: brandLogosMeta.label.plural,
          },
          {
            href: brandLogosMeta.href,
            label: "Edit " + brandLogo.name,
          },
        ])}
      />
      <PageTitle
        label={`Edit "${brandLogo.name}"`}
        backBtnHref={brandLogosMeta.href}
      />

      <BrandLogoEditForm brandLogo={brandLogo} />
    </PageStructure>
  );
};

export default BrandLogoPage;
