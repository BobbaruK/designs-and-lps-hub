import { CustomAvatar } from "@/components/custom-avatar";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { designsMeta } from "@/constants/page-titles/designs";
import { getBrandsMinimal } from "@/features/brands/data/get-brands";
import { getDesignBySlug } from "@/features/designs/data/get-design";
import { getLandingPageFeaturesMinimal } from "@/features/landing-page-features/data/get-landing-page-features";
import { getLandingPageTypesMinimal } from "@/features/landing-page-types/data/get-landing-page-types";
import { DataTableTransitionWrapper } from "@/features/landing-pages/components/table/data-table-transition-wrapper";
import {
  getLandingPages,
  getLandingPagesFilteredCount,
} from "@/features/landing-pages/data/get-landing-pages";
import { getLanguagesMinimal } from "@/features/languages/data/get-languages";
import { getLicensesMinimal } from "@/features/licenses/data/get-licenses";
import { getRegistrationTypesMinimal } from "@/features/registration-types/data/get-registration-types";
import { getTopicsMinimal } from "@/features/topics/data/get-topics";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { lpsWhere } from "@/lib/filtering/lps";
import { lpsOrderBy } from "@/lib/sorting/lps";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    designId: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const DesignPage = async ({ params, searchParams }: Props) => {
  const { designId } = await params;

  const {
    // Filters
    feature,
    brand,
    registrationType,
    language,
    topic,
    license,
    lpType,
    isARTS,
    isReadyForTraffic,
    whatsapp,
    isHome,
    isUnderMaintenance,
    operator,
    from,
    to,
    // Pagination
    pageIndex,
    pageSize,
    // Sorting
    sortBy,
    sort,
    // Search
    search,
    searchBy,
    // Select LPs
    selected,
  } = await loadSearchParams(searchParams);

  const lpsFilters = lpsWhere({
    filters: {
      feature,
      brand,
      topic,
      registrationType,
      language,
      license,
      landingPageType: lpType,
      isARTS,
      isReadyForTraffic,
      whatsapp,
      isHome,
      isUnderMaintenance,
      operator,
      search,
      searchBy,
      from,
      to,
    },
  });

  const orderBy = lpsOrderBy({ sort, sortBy });

  const design = await getDesignBySlug({
    slug: designId,
    lpsWhere: lpsFilters,
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
  });

  const designsLPsCount = await getLandingPagesFilteredCount({
    design: {
      slug: designId,
    },
    ...lpsFilters,
  });
  const landingPagesSelected = await getLandingPages({
    where: {
      id: {
        in: selected || [],
      },
    },
    perPage: -1,
    orderBy,
  });

  if (!design) notFound();

  const designHref = `${designsMeta.href}/${design.slug}`;

  const features = await getLandingPageFeaturesMinimal();

  const topics = await getTopicsMinimal();

  const licenses = await getLicensesMinimal();

  const landingPageTypes = await getLandingPageTypesMinimal();

  const registrationTypes = await getRegistrationTypesMinimal();

  const languages = await getLanguagesMinimal();

  const brands = await getBrandsMinimal();

  const showResetAll =
    (feature && feature.length > 0) ||
    (topic && topic.length > 0) ||
    (brand && brand.length > 0) ||
    (registrationType && registrationType.length > 0) ||
    (language && language.length > 0) ||
    (license && license.length > 0) ||
    (lpType && lpType.length > 0) ||
    typeof isARTS === "boolean" ||
    typeof isReadyForTraffic === "boolean" ||
    typeof whatsapp === "boolean" ||
    typeof isHome === "boolean" ||
    typeof isUnderMaintenance === "boolean" ||
    operator !== null
      ? true
      : false;

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: designsMeta.href,
            label: capitalizeFirstLetter(designsMeta.label.plural),
          },
          {
            href: designsMeta.href,
            label: design.name,
          },
        ])}
      />
      <PageTitle
        label={design?.name}
        backBtnHref={designsMeta.href}
        editBtnHref={`${designHref}/edit`}
      />

      <ScrollArea className="h-auto w-full max-w-full whitespace-nowrap rounded-md p-0 pb-2">
        <div className="flex w-max space-x-4">
          {design.avatars.map((avatar) => (
            <div className="flex flex-col items-center gap-2" key={avatar.id}>
              <p>{avatar.name}</p>
              <Link href={avatar.url} target="_blank">
                <CustomAvatar
                  image={avatar.url}
                  className="h-[220px] w-[350px] shrink-0 overflow-hidden rounded-md bg-black"
                />
              </Link>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <section>
        <h2 className="text-heading4">Landing pages</h2>
        <DataTableTransitionWrapper
          data={design.landingPages}
          dataCount={designsLPsCount}
          dataSelected={landingPagesSelected || undefined}
          filters={{
            features: features,
            topics: topics,
            licenses: licenses,
            landingPageTypes: landingPageTypes,
            registrationTypes: registrationTypes,
            languages: languages,
            brands: brands,
            showResetAll: showResetAll,
          }}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            createdAt: false,
            createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
        />
      </section>
    </PageStructure>
  );
};

export default DesignPage;
