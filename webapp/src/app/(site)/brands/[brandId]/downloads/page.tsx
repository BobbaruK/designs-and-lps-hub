import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { brandsMeta } from "@/constants/page-titles/brands";
import { getBrandBySlug } from "@/features/brands/data/get-brand";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    brandId: string;
  }>;
}

const BrandDownloadsPage = async ({ params }: Props) => {
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
          {
            href: brandHref + "/downloads",
            label: "Downloads",
          },
        ])}
      />
      <PageTitle label={brand.name + " downloads"} backBtnHref={brandHref} />

      <section></section>
      {/* <section>
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
			</section> */}
    </PageStructure>
  );
};

export default BrandDownloadsPage;
