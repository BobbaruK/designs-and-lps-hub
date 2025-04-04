import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
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
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { LP_SearchParamsPromise } from "@/types/landing-pages";
import { Prisma } from "@prisma/client";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: landingPagesMeta.href,
    label: capitalizeFirstLetter(landingPagesMeta.label.plural),
  },
];

interface Props {
  searchParams: LP_SearchParamsPromise;
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
    operator,
  } = await searchParams;
  const featuresArr: string[] =
    typeof feature === "string" ? feature.split(";") : [];
  const topicArr: string[] = typeof topic === "string" ? topic.split(";") : [];
  const brandArr: string[] = typeof brand === "string" ? brand.split(";") : [];
  const registrationTypeArr: string[] =
    typeof registrationType === "string" ? registrationType.split(";") : [];
  const languageArr: string[] =
    typeof language === "string" ? language.split(";") : [];
  const licenseArr: string[] =
    typeof license === "string" ? license.split(";") : [];
  const lpTypeArr: string[] =
    typeof lpType === "string" ? lpType.split(";") : [];

  const buildPrismaFilter = (operator: "AND" | "OR" = "AND") => {
    const filters: Prisma.dl_landing_pageWhereInput[] = [];

    const addFilter = (opts: {
      key: string;
      values: string[];
      subKey: "slug" | "iso_639_1";
      some: boolean;
    }) => {
      if (opts.values.length > 0) {
        filters.push({
          [opts.key]: {
            ...(opts.some
              ? {
                  some: {
                    [opts.subKey]: {
                      in: opts.values,
                    },
                  },
                }
              : {
                  [opts.subKey]: {
                    in: opts.values,
                  },
                }),
          },
        });
      }
    };

    addFilter({
      key: "features",
      some: true,
      values: featuresArr,
      subKey: "slug",
    });
    addFilter({
      key: "topic",
      some: false,
      values: topicArr,
      subKey: "slug",
    });
    addFilter({
      key: "brand",
      some: false,
      values: brandArr,
      subKey: "slug",
    });
    addFilter({
      key: "registrationType",
      some: false,
      values: registrationTypeArr,
      subKey: "slug",
    });
    addFilter({
      key: "language",
      some: false,
      values: languageArr,
      subKey: "iso_639_1",
    });
    addFilter({
      key: "license",
      some: false,
      values: licenseArr,
      subKey: "slug",
    });
    addFilter({
      key: "landingPageType",
      some: false,
      values: lpTypeArr,
      subKey: "slug",
    });

    return filters.length > 0 ? { [operator]: filters } : {};
  };

  const lpsWhere = (): Prisma.dl_landing_pageWhereInput => {
    switch (operator) {
      case "AND":
        const prismaWhereAND = buildPrismaFilter("AND");
        return prismaWhereAND;

      case "OR":
        const prismaWhereOR = buildPrismaFilter("OR");
        return prismaWhereOR;

      default:
        const prismaWhereDefault = buildPrismaFilter("AND");
        return prismaWhereDefault;
    }
  };

  const lpsFilters = lpsWhere();

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
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
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
            <LandingPageFiltering
              features={features}
              topics={topics}
              licenses={licenses}
              landingPageTypes={landingPageTypes}
              registrationTypes={registrationTypes}
              languages={languages}
              brands={brands}
              showResetAll={
                featuresArr.length > 0 ||
                topicArr.length > 0 ||
                brandArr.length > 0 ||
                registrationTypeArr.length > 0 ||
                languageArr.length > 0 ||
                licenseArr.length > 0 ||
                lpTypeArr.length > 0 ||
                operator !== undefined
                  ? true
                  : false
              }
            />
          }
        />
      )}
    </PageStructure>
  );
};

export default LandingPagesPage;
