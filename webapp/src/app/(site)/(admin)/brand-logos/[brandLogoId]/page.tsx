import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { BrandLogoEditForm } from "@/features/brand-logos/components/form/brand-logo-edit";
import { getBrandLogoById } from "@/features/brand-logos/data/get-brand-logo";
import { IBreadcrumb } from "@/types/breadcrumb";
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

  const BREADCRUMBS: IBreadcrumb[] = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Admin",
    },
    {
      href: "/brand-logos",
      label: "Brand Logos",
    },
    {
      href: `/brand-logos/${brandLogoId}`,
      label: brandLogo?.name || "Brand Logo Unknown",
    },
  ];

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Edit Brand Logo "${brandLogo?.name}"`}
        backBtnHref="/brand-logos"
      />

      <BrandLogoEditForm brandLogo={brandLogo} />
    </PageStructure>
  );
};

export default BrandLogoPage;
