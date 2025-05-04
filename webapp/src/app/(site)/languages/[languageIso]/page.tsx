import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { languagesMeta } from "@/constants/page-titles/languages";
import { getBrandsMinimal } from "@/features/brands/data/get-brands";
import { getLandingPageFeaturesMinimal } from "@/features/landing-page-features/data/get-landing-page-features";
import { getLandingPageTypesMinimal } from "@/features/landing-page-types/data/get-landing-page-types";
import { DataTableTransitionWrapper } from "@/features/landing-pages/components/table/data-table-transition-wrapper";
import { getLandingPagesFilteredCount } from "@/features/landing-pages/data/get-landing-pages";
import { getLanguageBySlug } from "@/features/languages/data/get-language";
import { getLicensesMinimal } from "@/features/licenses/data/get-licenses";
import { getRegistrationTypesMinimal } from "@/features/registration-types/data/get-registration-types";
import { getTopicsMinimal } from "@/features/topics/data/get-topics";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { lpsWhere } from "@/lib/filtering/lps";
import { lpsOrderBy } from "@/lib/sorting/lps";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";
import { SearchParams } from "nuqs/server";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: languagesMeta.href,
      label: capitalizeFirstLetter(languagesMeta.label.plural),
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    languageIso: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const LanguagePage = async ({ params, searchParams }: Props) => {
  const { languageIso } = await params;

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

  const landingPageTypes = await getLandingPageTypesMinimal();

  const registrationTypes = await getRegistrationTypesMinimal();

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

  const actualLanguage = await getLanguageBySlug({
    slug: languageIso,
    lpsWhere: lpsFilters,
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
  });
  const landingPagesCount = await getLandingPagesFilteredCount({
    language: {
      slug: languageIso,
    },
    ...lpsFilters,
  });

  if (!actualLanguage) notFound();

  const languageHref = `${languagesMeta.href}/${actualLanguage.slug}`;

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn(
          BREADCRUMBS({
            href: languageHref,
            label: actualLanguage.englishName,
          }),
        )}
      />
      <PageTitle
        label={actualLanguage.englishName}
        backBtnHref={languagesMeta.href}
        editBtnHref={`${languageHref}/edit`}
      />

      <p>
        {actualLanguage.name} / {actualLanguage.iso_639_1}
        {actualLanguage.iso_3166_1 && "-" + actualLanguage.iso_3166_1}
      </p>

      <section>
        <h2 className="text-heading4">Landing pages</h2>

        <DataTableTransitionWrapper
          data={actualLanguage.landingPages}
          filters={{
            features: features,
            topics: topics,
            licenses: licenses,
            landingPageTypes: landingPageTypes,
            registrationTypes: registrationTypes,
            brands: brands,
            showResetAll: showResetAll,
          }}
          dataCount={landingPagesCount}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            language: false,
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

export default LanguagePage;
