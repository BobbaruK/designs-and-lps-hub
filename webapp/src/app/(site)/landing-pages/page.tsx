import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { loadSearchParams } from "@/components/search-params";
import { ACTION_MESSAGES } from "@/constants/messages";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { getBrandsMinimal } from "@/features/brands/data/get-brands";
import { getLandingPageFeaturesMinimal } from "@/features/landing-page-features/data/get-landing-page-features";
import { getLandingPageTypesMinimal } from "@/features/landing-page-types/data/get-landing-page-types";
import { LandingPageFiltering } from "@/features/landing-pages/components/landing-page-filtering";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { getLandingPages } from "@/features/landing-pages/data/get-landing-pages";
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
    feature,
    brand,
    registrationType,
    language,
    topic,
    license,
    lpType,
    isArts,
    isReadyForTraffic,
    whatsapp,
    operator,
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

    if (isArts !== null) {
      resourcesToFilter.push({
        isArts,
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

  /**
   *
   */

  const landingPages = await getLandingPages(lpsFilters);

  const features = await getLandingPageFeaturesMinimal();

  const topics = await getTopicsMinimal();

  const licenses = await getLicensesMinimal();

  const landingPageTypes = await getLandingPageTypesMinimal();

  const registrationTypes = await getRegistrationTypesMinimal();

  const languages = await getLanguagesMinimal();

  const brands = await getBrandsMinimal();

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
        <DataTable
          columns={columns}
          data={landingPages}
          columnVisibilityObj={{
            slug: false,
            fxoroFooter: false,
            requester: false,
            createdAt: false,
            createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
          legendItems={<LandingPageLegend />}
          advancedFiltering={
            <>
              {/* <NewLandingPageFiltering
                resources={[
                  {
                    name: capitalizeFirstLetter(
                      featuresTypeMeta.label.singular,
                    ),
                    data: features,
                    variant: "multiSelect",
                  },
                  {
                    name: capitalizeFirstLetter(topicsMeta.label.singular),
                    data: topics,
                    variant: "multiSelect",
                  },
                  {
                    name: capitalizeFirstLetter(licensesMeta.label.singular),
                    data: licenses,
                    variant: "multiSelect",
                  },
                  {
                    name: capitalizeFirstLetter(
                      landingPageTypeMeta.label.singular,
                    ),
                    data: landingPageTypes,
                    variant: "multiSelect",
                  },
                  {
                    name: capitalizeFirstLetter(
                      registrationTypesMeta.label.singular,
                    ),
                    data: registrationTypes,
                    variant: "multiSelect",
                  },
                  {
                    name: capitalizeFirstLetter(languagesMeta.label.singular),
                    data: languages
                      ? languages.map((lang) => ({
                          id: lang.id,
                          name: lang.englishName,
                          slug: lang.iso_639_1,
                        }))
                      : null,
                    variant: "multiSelect",
                  },
                  {
                    name: capitalizeFirstLetter(brandsMeta.label.singular),
                    data: brands,
                    variant: "multiSelect",
                  },
                ]}
              /> */}
              <LandingPageFiltering
                features={features}
                topics={topics}
                licenses={licenses}
                landingPageTypes={landingPageTypes}
                registrationTypes={registrationTypes}
                languages={languages}
                brands={brands}
                showResetAll={false}
                // showResetAll={
                //   featuresArr.length > 0 ||
                //   topicArr.length > 0 ||
                //   brandArr.length > 0 ||
                //   registrationTypeArr.length > 0 ||
                //   languageArr.length > 0 ||
                //   licenseArr.length > 0 ||
                //   lpTypeArr.length > 0 ||
                //   isArts !== undefined ||
                //   isReadyForTraffic !== undefined ||
                //   whatsapp !== undefined ||
                //   operator !== undefined
                //     ? true
                //     : false
                // }
              />
            </>
          }
        />
      )}
    </PageStructure>
  );
};

export default LandingPagesPage;
