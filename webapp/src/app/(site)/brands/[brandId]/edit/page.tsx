import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { getBrandLogos } from "@/features/brand-logos/data/get-brand-logos";
import { BrandEditForm } from "@/features/brands/components/form/brand-edit";
import { getBrandBySlug } from "@/features/brands/data/get-brand";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/brands",
      label: "Brands",
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

  const brand = await getBrandBySlug(brandId);

  if (!brand) notFound();

  const brandLogos = await getBrandLogos();

  if (!brandLogos)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Flags").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/brands/${brand.slug}`,
          label: "Edit " + brand.name,
        })}
      />
      <PageTtle
        label={`Edit "${brand?.name}"`}
        backBtnHref={`/brands/${brand.slug}`}
      />

      <BrandEditForm brand={brand} logos={brandLogos} />
    </PageStructure>
  );
};

export default EditLicensePage;
