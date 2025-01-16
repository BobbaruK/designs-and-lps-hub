import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { BrandLogoEditForm } from "@/features/brand-logos/components/form/brand-logo-edit";
import { getBrandLogoById } from "@/features/brand-logos/data/get-brand-logo";
import { FlagEditForm } from "@/features/flags/components/form/flag-edit";
import { IBreadcrumb } from "@/types";

interface Props {
  params: Promise<{
    brandLogoId: string;
  }>;
}

const BrandLogoPage = async ({ params }: Props) => {
  const { brandLogoId } = await params;

  const brandLogo = await getBrandLogoById(brandLogoId);

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
        label={`Edit Brand Logo "${brandLogo?.name || "Brand Logo Unknown"}"`}
        backBtnHref="/brand-logos"
      />

      {!brandLogo ? (
        <CustomAlert
          title={"Error!"}
          description={`Seems like the Brand Logo that you are looking for does not exist.`}
          variant="destructive"
        />
      ) : (
        <BrandLogoEditForm brandLogo={brandLogo} />
      )}
    </PageStructure>
  );
};

export default BrandLogoPage;
