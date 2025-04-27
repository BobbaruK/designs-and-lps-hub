import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { DataTableTransitionWrapper } from "@/features/landing-pages/components/table/data-table-transition-wrapper";
import { licensesMeta } from "@/constants/page-titles/licenses";
import { getBrandsMinimal } from "@/features/brands/data/get-brands";
import { getLandingPageFeaturesMinimal } from "@/features/landing-page-features/data/get-landing-page-features";
import { getLandingPageTypesMinimal } from "@/features/landing-page-types/data/get-landing-page-types";
import { getLandingPagesFilteredCount } from "@/features/landing-pages/data/get-landing-pages";
import { getLanguagesMinimal } from "@/features/languages/data/get-languages";
import { getLicenseBySlug } from "@/features/licenses/data/get-license";
import { getRegistrationTypesMinimal } from "@/features/registration-types/data/get-registration-types";
import { getTopicsMinimal } from "@/features/topics/data/get-topics";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { lpsWhere } from "@/lib/filtering";
import { lpsOrderBy } from "@/lib/sorting";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";
import { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    licenseId: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const LicensePage = async ({ params, searchParams }: Props) => {
  const { licenseId } = await params;

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
    operator !== null
      ? true
      : false;

  const licenseHref = `${licensesMeta.href}/${licenseId}`;

  const actualLicense = await getLicenseBySlug({
    slug: licenseId,
    lpsWhere: lpsFilters,
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
  });
  const landingPagesCount = await getLandingPagesFilteredCount({
    license: {
      slug: licenseId,
    },
    ...lpsFilters,
  });

  if (!actualLicense) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: licensesMeta.href,
            label: capitalizeFirstLetter(licensesMeta.label.plural),
          },
          {
            href: licenseHref,
            label: actualLicense.name,
          },
        ])}
      />
      <PageTitle
        label={actualLicense.name}
        backBtnHref={licensesMeta.href}
        editBtnHref={`${licenseHref}/edit`}
      />
      <div>
        {actualLicense.description ? (
          <pre className="whitespace-pre-wrap">{actualLicense.description}</pre>
        ) : (
          <p>
            <span className="italic">There is no description added</span>
          </p>
        )}
      </div>

      <section>
        <h2 className="text-heading4">Landing pages</h2>

        <DataTableTransitionWrapper
          data={actualLicense.landingPages}
          filters={{
            features: features,
            topics: topics,
            landingPageTypes: landingPageTypes,
            registrationTypes: registrationTypes,
            languages: languages,
            brands: brands,
            showResetAll: showResetAll,
          }}
          dataCount={landingPagesCount}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            license: false,
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

export default LicensePage;
