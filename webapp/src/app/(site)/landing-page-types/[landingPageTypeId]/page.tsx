import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { getBrandsMinimal } from "@/features/brands/data/get-brands";
import { getLandingPageFeaturesMinimal } from "@/features/landing-page-features/data/get-landing-page-features";
import { getLandingPageTypeBySlug } from "@/features/landing-page-types/data/get-landing-page-type";
import { DataTableTransitionWrapper } from "@/features/landing-pages/components/table/data-table-transition-wrapper";
import { getLandingPagesFilteredCount } from "@/features/landing-pages/data/get-landing-pages";
import { getLanguagesMinimal } from "@/features/languages/data/get-languages";
import { getLicensesMinimal } from "@/features/licenses/data/get-licenses";
import { getRegistrationTypesMinimal } from "@/features/registration-types/data/get-registration-types";
import { getTopicsMinimal } from "@/features/topics/data/get-topics";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { lpsWhere } from "@/lib/filtering";
import { lpsOrderBy } from "@/lib/sorting/lps-orderby";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";
import { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    landingPageTypeId: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const LandingPageTypePage = async ({ params, searchParams }: Props) => {
  const { landingPageTypeId } = await params;

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
      operator,
      search,
      from,
      to,
    },
  });

  const orderBy = lpsOrderBy({ sort, sortBy });

  const features = await getLandingPageFeaturesMinimal();

  const topics = await getTopicsMinimal();

  const licenses = await getLicensesMinimal();

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
    operator !== null
      ? true
      : false;

  const actualLandingPageType = await getLandingPageTypeBySlug({
    slug: landingPageTypeId,
    lpsWhere: lpsFilters,
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
  });
  const landingPagesCount = await getLandingPagesFilteredCount({
    landingPageType: {
      slug: landingPageTypeId,
    },
    ...lpsFilters,
  });

  if (!actualLandingPageType) notFound();

  const landingPageTypeHref = `${landingPageTypeMeta.href}/${actualLandingPageType.slug}`;

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: landingPageTypeMeta.href,
            label: capitalizeFirstLetter(landingPageTypeMeta.label.plural),
          },
          {
            href: landingPageTypeHref,
            label: actualLandingPageType.name,
          },
        ])}
      />
      <PageTitle
        label={actualLandingPageType?.name}
        backBtnHref={landingPageTypeMeta.href}
        editBtnHref={`${landingPageTypeHref}/edit`}
      />
      <div>
        {actualLandingPageType.description ? (
          <pre className="whitespace-pre-wrap">
            {actualLandingPageType.description}
          </pre>
        ) : (
          <p>
            <span className="italic">There is no description added</span>
          </p>
        )}
      </div>

      <section>
        <h2 className="text-heading4">Landing pages</h2>

        <DataTableTransitionWrapper
          data={actualLandingPageType.landingPages}
          filters={{
            features: features,
            topics: topics,
            licenses: licenses,
            registrationTypes: registrationTypes,
            languages: languages,
            brands: brands,
            showResetAll: showResetAll,
          }}
          dataCount={landingPagesCount}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            landingPageType: false,
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

export default LandingPageTypePage;
