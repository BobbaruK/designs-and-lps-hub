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
  const { feature, foperator, topic } = await searchParams;
  const featuresArr: string[] =
    typeof feature === "string" ? feature.split(";") : [];

  const landingPages = await getLandingPages({
    ...(feature
      ? {
          OR: [
            ...(featuresArr.length > 0
              ? featuresArr.map((feature) => ({
                  features: {
                    some: {
                      slug: feature,
                    },
                  },
                }))
              : []),
          ],
        }
      : {}),
    // AND: {
    //   OR: [
    //     {
    //       brand: {
    //         slug: "oracle-signals",
    //       },
    //     },
    //     {
    //       brand: {
    //         slug: "day-trading-star",
    //       },
    //     },
    //   ],
    //   AND: {
    //     OR: [
    //       {
    //         design: {
    //           slug: "thonga",
    //         },
    //       },
    //     ],
    //   },
    // },

    // AND: {
    //   OR: [],
    //   brand: {
    //     slug: "day-trading-star",
    //     // slug: "oracle-signals",
    //   },
    // },

    // features: {
    //   some: {
    //     slug: "outbrain",
    //     OR: [{}],
    //   },
    // },
  });

  const features = await getLandingPageFeaturesMinimal();

  const topics = await getTopicsMinimal();

  const licenses = await getLicensesMinimal();

  const landingPageTypes = await getLandingPageTypesMinimal();

  const registrationTypes = await getRegistrationTypesMinimal();

  const languages = await getLanguagesMinimal();

  const brands = await getBrandsMinimal();

  return (
    <PageStructure>
      {/* <pre>{JSON.stringify(featuresArr, null, 2)}</pre> */}
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
              searchParams={{ feature, foperator, topic }}
            />
          }
        />
      )}
    </PageStructure>
  );
};

export default LandingPagesPage;
