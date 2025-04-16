import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { brandsMeta } from "@/constants/page-titles/brands";
import { getBrandBySlug } from "@/features/brands/data/get-brand";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

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
        crumbs={breadCrumbsFn([
          {
            href: brandsMeta.href,
            label: capitalizeFirstLetter(brandsMeta.label.plural),
          },
          {
            href: brandHref,
            label: brand.name,
          },
        ])}
      />
      <PageTitle
        label={brand.name}
        backBtnHref={brandsMeta.href}
        editBtnHref={`${brandHref}/edit`}
      />

      <section>
        <Button asChild variant={"ghost"} size={"sm"}>
          <Link href={`${brandsMeta.href}/${brandId}/downloads`}>
            Downloads
          </Link>
        </Button>
      </section>
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
