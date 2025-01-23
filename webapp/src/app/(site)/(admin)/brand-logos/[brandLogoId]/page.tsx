import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { brandLogosMeta } from "@/constants/page-titles/brand-logos";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { BrandLogoEditForm } from "@/features/brand-logos/components/form/brand-logo-edit";
import { getBrandLogoById } from "@/features/brand-logos/data/get-brand-logo";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
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
      href,
      label,
    },
  ];
};

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
        crumbs={BREADCRUMBS({
          href: brandLogosMeta.href,
          label: "Edit " + brandLogo.name,
        })}
      />
      <PageTtle
        label={`Edit "${brandLogo.name}"`}
        backBtnHref={brandLogosMeta.href}
      />

      <BrandLogoEditForm brandLogo={brandLogo} />
    </PageStructure>
  );
};

export default BrandLogoPage;
