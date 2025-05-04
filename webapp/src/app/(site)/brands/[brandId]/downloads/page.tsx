import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandResourcesMeta } from "@/constants/page-titles/brand-resources";
import { brandsMeta } from "@/constants/page-titles/brands";
import { DataTableTransitionWrapper } from "@/features/brand-resources/components/table/data-table-transition-wrapper";
import {
  getBrandResources,
  getBrandResourcesCount,
} from "@/features/brand-resources/data/get-brand-resources";
import { getBrandBySlug } from "@/features/brands/data/get-brand";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { brandDownloadsWhere } from "@/lib/filtering/brand-downloads";
import { brandDownloadsOrderBy } from "@/lib/sorting/brand-downloads";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";
import { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    brandId: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const BrandDownloadsPage = async ({ params, searchParams }: Props) => {
  const {
    // Filters
    from,
    to,
    type,
    // Pagination
    pageIndex,
    pageSize,
    // Sorting
    sortBy,
    sort,
    // Search
    search,
  } = await loadSearchParams(searchParams);

  const filters = brandDownloadsWhere({
    filters: { type, search, from, to },
  });

  const orderBy = brandDownloadsOrderBy({ sort, sortBy });

  const { brandId } = await params;

  const brand = await getBrandBySlug({
    slug: brandId,
  });

  if (!brand) notFound();

  const brandHref = `${brandsMeta.href}/${brand.slug}`;

  const brandResources = await getBrandResources({
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
    where: {
      brand: {
        id: {
          equals: brand.id,
        },
      },
      ...filters,
    },
  });

  const brandResourcesCount = await getBrandResourcesCount({
    brand: {
      id: {
        equals: brand.id,
      },
    },
    ...filters,
  });

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

      <section>
        <h2 className="text-heading4">Resources</h2>
        {!brandResources ? (
          <CustomAlert
            title={"Error!"}
            description={
              ACTION_MESSAGES(brandResourcesMeta.label.plural).CUSTOM_ALERT
            }
            variant="destructive"
          />
        ) : (
          <DataTableTransitionWrapper
            data={brandResources}
            dataCount={brandResourcesCount}
            columnVisibilityObj={{
              brand: false,
              createdBy: false,
              updatedAt: false,
              updatedBy: false,
            }}
            showResetAll={
              (type && type.length > 0) || from || to ? true : false
            }
          />
        )}
      </section>
    </PageStructure>
  );
};

export default BrandDownloadsPage;
