import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { brandsMeta } from "@/constants/page-titles/brands";
import { clientColumns } from "@/features/brand-resources/components/table/client-columns";
import { getBrandResources } from "@/features/brand-resources/data/get-brand-resources";
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

  const brand = await getBrandBySlug({
    slug: brandId,
  });

  if (!brand) notFound();

  const brandHref = `${brandsMeta.href}/${brand.slug}`;

  const brandResources = await getBrandResources({
    brand: {
      id: {
        equals: brand.id,
      },
    },
  });

  console.log({ brandResources });

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
      <section>
        <h2 className="text-heading4">Landing pages</h2>
        {!brandResources ? (
          <CustomAlert
            title={"Error!"}
            description={
              ACTION_MESSAGES(brandResourcesMeta.label.plural).CUSTOM_ALERT
            }
            variant="destructive"
          />
        ) : (
          <DataTable
            columns={clientColumns}
            data={brandResources}
            columnVisibilityObj={{
              brand: false,
              createdAt: false,
              createdBy: false,
              updatedAt: false,
              updatedBy: false,
            }}
          />
        )}
      </section>
    </PageStructure>
  );
};

export default BrandDownloadsPage;
