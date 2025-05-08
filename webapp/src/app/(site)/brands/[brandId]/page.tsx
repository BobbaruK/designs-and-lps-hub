import { CustomAvatar } from "@/components/custom-avatar";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { Button } from "@/components/ui/button";
import { brandsMeta } from "@/constants/page-titles/brands";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { getBrandBySlug } from "@/features/brands/data/get-brand";
import { getLandingPageFeaturesMinimal } from "@/features/landing-page-features/data/get-landing-page-features";
import { getLandingPageTypesMinimal } from "@/features/landing-page-types/data/get-landing-page-types";
import { DataTableTransitionWrapper } from "@/features/landing-pages/components/table/data-table-transition-wrapper";
import { getLandingPage } from "@/features/landing-pages/data/get-landing-page";
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
    brandId: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const BrandPage = async ({ params, searchParams }: Props) => {
  const { brandId } = await params;

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

  const actualBrand = await getBrandBySlug({
    slug: brandId,
    lpsWhere: lpsFilters,
    orderBy,
    pageNumber: pageIndex,
    perPage: pageSize,
  });
  const landingPagesCount = await getLandingPagesFilteredCount({
    brand: {
      slug: brandId,
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

  if (!actualBrand) notFound();

  const homeLandingPage = await getLandingPage({
    where: {
      brandId: actualBrand.id,
      isHome: true,
    },
  });

  const brandHref = `${brandsMeta.href}/${actualBrand.slug}`;

  const features = await getLandingPageFeaturesMinimal();

  const topics = await getTopicsMinimal();

  const licenses = await getLicensesMinimal();

  const landingPageTypes = await getLandingPageTypesMinimal();

  const registrationTypes = await getRegistrationTypesMinimal();

  const languages = await getLanguagesMinimal();

  const showResetAll =
    (feature && feature.length > 0) ||
    (topic && topic.length > 0) ||
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
      <PageBreadcrumbs
        crumbs={breadCrumbsFn([
          {
            href: brandsMeta.href,
            label: capitalizeFirstLetter(brandsMeta.label.plural),
          },
          {
            href: brandHref,
            label: actualBrand.name,
          },
        ])}
      />
      <PageTitle
        label={actualBrand.name}
        backBtnHref={brandsMeta.href}
        editBtnHref={`${brandHref}/edit`}
      />

      <section className="flex flex-row-reverse flex-wrap items-center justify-between gap-4">
        {homeLandingPage ? (
          <Link
            // href={homeLandingPage.url}
            href={`${landingPagesMeta.href}/${homeLandingPage.slug}`}
            // target="_blank"
            className="flex flex-row-reverse items-center gap-2"
          >
            <CustomAvatar
              image={homeLandingPage.design?.avatar}
              className="h-[110px] w-[100px] overflow-hidden rounded-md bg-black"
            />
            {homeLandingPage.name}
          </Link>
        ) : (
          <p>No landing page home selected</p>
        )}
        <Button asChild variant={"ghost"} size={"sm"}>
          <Link href={`${brandsMeta.href}/${brandId}/downloads`}>
            Downloads
          </Link>
        </Button>
      </section>

      <section>
        <h2 className="text-heading4">Landing pages</h2>

        <DataTableTransitionWrapper
          data={actualBrand.landingPages}
          dataSelected={landingPagesSelected || undefined}
          dataCount={landingPagesCount}
          filters={{
            features: features,
            topics: topics,
            licenses: licenses,
            landingPageTypes: landingPageTypes,
            registrationTypes: registrationTypes,
            languages: languages,
            showResetAll: showResetAll,
          }}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            brand: false,
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

export default BrandPage;
