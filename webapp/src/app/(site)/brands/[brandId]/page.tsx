import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { brandsMeta } from "@/constants/page-titles/brands";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { getBrandBySlug } from "@/features/brands/data/get-brand";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { capitalizeFirstLetter } from "@/lib/utils";
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
      label: capitalizeFirstLetter(brandsMeta.label.plural),
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

const BrandPage = async ({ params }: Props) => {
  const { brandId } = await params;

  const brand = await getBrandBySlug(brandId);

  if (!brand) notFound();

  const brandHref = `${brandsMeta.href}/${brand.slug}`;

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: brandHref,
          label: brand.name,
        })}
      />
      <PageTtle
        label={brand.name}
        backBtnHref={brandsMeta.href}
        editBtnHref={`${brandHref}/edit`}
      />

      <section>
        <h2 className="text-heading4">Landing pages</h2>
        <DataTable
          columns={columns}
          data={brand.landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            brand: false,
            createdAt: false,
            createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
          legendItems={<LandingPageLegend />}
        />
      </section>
    </PageStructure>
  );
};

export default BrandPage;
