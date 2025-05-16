import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { topicsMeta } from "@/constants/page-titles/topics";
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
import { getRegistrationTypesMinimal } from "@/features/registration-types/data/get-registration-types";
import { getTopicBySlug } from "@/features/topics/data/get-topic";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { lpsWhere } from "@/lib/filtering/lps";
import { lpsOrderBy } from "@/lib/sorting/lps";
import { capitalizeFirstLetter } from "@/lib/utils";
import { notFound } from "next/navigation";
import { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    topicId: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const TopicPage = async ({ params, searchParams }: Props) => {
  const { topicId } = await params;

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
      operator,
      search,
      searchBy,
      from,
      to,
    },
  });

  const orderBy = lpsOrderBy({ sort, sortBy });

  const features = await getLandingPageFeaturesMinimal();

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
    operator !== null
      ? true
      : false;

  const topicHref = `${topicsMeta.href}/${topicId}`;

  const actualTopic = await getTopicBySlug({
    slug: topicId,
    lpsWhere: lpsFilters,
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
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
  const landingPagesCount = await getLandingPagesFilteredCount({
    topic: {
      slug: topicId,
    },
    ...lpsFilters,
  });

  if (!actualTopic) notFound();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: topicsMeta.href,
            label: capitalizeFirstLetter(topicsMeta.label.plural),
          },
          {
            href: topicHref,
            label: actualTopic.name,
          },
        ])}
      />
      <PageTitle
        label={actualTopic.name}
        backBtnHref={topicsMeta.href}
        editBtnHref={`${topicHref}/edit`}
      />
      <div>
        {actualTopic.description ? (
          <pre className="whitespace-pre-wrap">{actualTopic.description}</pre>
        ) : (
          <p>
            <span className="italic">There is no description added</span>
          </p>
        )}
      </div>

      <section>
        <h2 className="text-heading4">Landing pages</h2>

        <DataTableTransitionWrapper
          data={actualTopic.landingPages}
          dataSelected={landingPagesSelected || undefined}
          dataCount={landingPagesCount}
          filters={{
            features: features,
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
            topic: false,
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

export default TopicPage;
