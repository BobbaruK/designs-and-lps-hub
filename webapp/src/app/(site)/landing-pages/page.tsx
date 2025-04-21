import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { getBrandsMinimal } from "@/features/brands/data/get-brands";
import { getLandingPageFeaturesMinimal } from "@/features/landing-page-features/data/get-landing-page-features";
import { getLandingPageTypesMinimal } from "@/features/landing-page-types/data/get-landing-page-types";
import { DataTableTransitionWrapper } from "@/features/landing-pages/components/table/data-table-transition-wrapper";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import {
  getLandingPages,
  getLandingPagesFilteredCount,
} from "@/features/landing-pages/data/get-landing-pages";
import { getLanguagesMinimal } from "@/features/languages/data/get-languages";
import { getLicensesMinimal } from "@/features/licenses/data/get-licenses";
import { getRegistrationTypesMinimal } from "@/features/registration-types/data/get-registration-types";
import { getTopicsMinimal } from "@/features/topics/data/get-topics";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { buildPrismaFilter } from "@/lib/filtering";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { ResourceToFilter } from "@/types/resources-to-filter";
import { Prisma } from "@prisma/client";
import type { SearchParams } from "nuqs/server";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: landingPagesMeta.href,
    label: capitalizeFirstLetter(landingPagesMeta.label.plural),
  },
];

interface Props {
  searchParams: Promise<SearchParams>;
}

const LandingPagesPage = async ({ searchParams }: Props) => {
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
    // Pagination
    pageIndex,
    pageSize,
    // Sorting
    sortBy,
    sort,
  } = await loadSearchParams(searchParams);

  const lpsWhere = (): Prisma.dl_landing_pageWhereInput => {
    const resourcesToFilter: ResourceToFilter[] = [
      { features: feature },
      { brand: brand },
      { topic: topic },
      { registrationType: registrationType },
      { language: language },
      { license: license },
      { landingPageType: lpType },
    ];

    if (isARTS !== null) {
      resourcesToFilter.push({
        isARTS,
      });
    }

    if (isReadyForTraffic !== null) {
      resourcesToFilter.push({
        isReadyForTraffic,
      });
    }

    if (whatsapp !== null) {
      resourcesToFilter.push({
        whatsapp,
      });
    }

    switch (operator) {
      case "AND":
        const prismaWhereAND = buildPrismaFilter("AND", resourcesToFilter);
        return prismaWhereAND;

      case "OR":
        const prismaWhereOR = buildPrismaFilter("OR", resourcesToFilter);
        return prismaWhereOR;

      default:
        const prismaWhereDefault = buildPrismaFilter("AND", resourcesToFilter);
        return prismaWhereDefault;
    }
  };
  const lpsFilters = lpsWhere();

  const lpsOrderBy = (): Prisma.dl_landing_pageOrderByWithRelationInput => {
    if (
      sortBy === "name" ||
      sortBy === "slug" ||
      sortBy === "url" ||
      sortBy === "createdAt" ||
      sortBy === "updatedAt"
    ) {
      return {
        [sortBy]: sort || "desc",
      };
    }

    if (
      sortBy === "requester" ||
      sortBy === "topic" ||
      sortBy === "license" ||
      sortBy === "landingPageType" ||
      sortBy === "registrationType" ||
      sortBy === "language" ||
      sortBy === "brand" ||
      sortBy === "createdBy" ||
      sortBy === "updatedBy"
    ) {
      return {
        [sortBy]: {
          slug: sort || "desc",
        },
      };
    }

    return {
      [sortBy || "createdAt"]: sort || "desc",
    };
  };
  const orderBy = lpsOrderBy();

  console.log({ orderBy });

  /**
   *
   */

  const landingPages = await getLandingPages({
    where: lpsFilters,
    pageNumber: pageIndex,
    perPage: pageSize,
    // orderBy: {
    //   [sortBy || "createdAt"]: sort || "desc",
    // },
    orderBy,
  });
  const landingPagesCount = await getLandingPagesFilteredCount(lpsFilters);

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
    operator !== null
      ? true
      : false;

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(landingPagesMeta.label.plural)}
        addBtnHref={`${landingPagesMeta.href}/add`}
      />
      {!landingPages ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(landingPagesMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTableTransitionWrapper
          columns={columns}
          data={landingPages}
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
          dataCount={landingPagesCount}
        />
      )}
    </PageStructure>
  );
};

export default LandingPagesPage;
