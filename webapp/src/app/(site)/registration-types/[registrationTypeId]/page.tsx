import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { getBrandsMinimal } from "@/features/brands/data/get-brands";
import { getLandingPageFeaturesMinimal } from "@/features/landing-page-features/data/get-landing-page-features";
import { getLandingPageTypesMinimal } from "@/features/landing-page-types/data/get-landing-page-types";
import { DataTableTransitionWrapper } from "@/features/landing-pages/components/table/data-table-transition-wrapper";
import {
  getLandingPages,
  getLandingPagesFilteredCount,
} from "@/features/landing-pages/data/get-landing-pages";
import { getLanguagesMinimal } from "@/features/languages/data/get-languages";
import { getLicensesMinimal } from "@/features/licenses/data/get-licenses";
import { getRegistrationTypeBySlug } from "@/features/registration-types/data/get-registration-type";
import { getTopicsMinimal } from "@/features/topics/data/get-topics";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { lpsWhere } from "@/lib/filtering/lps";
import { lpsOrderBy } from "@/lib/sorting/lps";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";
import { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    registrationTypeId: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const registrationTypePage = async ({ params, searchParams }: Props) => {
  const { registrationTypeId } = await params;

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

  const registrationTypeHref = `${registrationTypesMeta.href}/${registrationTypeId}`;

  const actualRegistrationType = await getRegistrationTypeBySlug({
    slug: registrationTypeId,
    lpsWhere: lpsFilters,
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
  });

  const landingPagesCount = await getLandingPagesFilteredCount({
    registrationType: {
      slug: registrationTypeId,
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

  if (!actualRegistrationType) notFound();

  const features = await getLandingPageFeaturesMinimal();

  const topics = await getTopicsMinimal();

  const licenses = await getLicensesMinimal();

  const landingPageTypes = await getLandingPageTypesMinimal();

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
            href: registrationTypesMeta.href,
            label: capitalizeFirstLetter(registrationTypesMeta.label.plural),
          },
          {
            href: registrationTypeHref,
            label: actualRegistrationType.name,
          },
        ])}
      />
      <PageTitle
        label={actualRegistrationType.name}
        backBtnHref={registrationTypesMeta.href}
        editBtnHref={`${registrationTypeHref}/edit`}
      />
      <div>
        {actualRegistrationType.description ? (
          <pre className="whitespace-pre-wrap">
            {actualRegistrationType.description}
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
          data={actualRegistrationType.landingPages}
          dataSelected={landingPagesSelected || undefined}
          dataCount={landingPagesCount}
          filters={{
            features: features,
            topics: topics,
            licenses: licenses,
            landingPageTypes: landingPageTypes,
            languages: languages,
            brands: brands,
            showResetAll: showResetAll,
          }}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            registrationType: false,
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

export default registrationTypePage;
