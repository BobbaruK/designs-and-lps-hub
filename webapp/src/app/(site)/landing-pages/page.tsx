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

  const lpsWhere = (): Prisma.dl_landing_pageWhereInput => {
    // TODO: better this
    switch (operator) {
      case "AND":
        return {
          AND: {
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

            AND: {
              OR: [
                ...(topicArr.length > 0
                  ? topicArr.map((slug) => ({
                      topic: {
                        slug,
                      },
                    }))
                  : []),
              ],

              AND: {
                OR: [
                  ...(brandArr.length > 0
                    ? brandArr.map((slug) => ({
                        brand: {
                          slug,
                        },
                      }))
                    : []),
                ],

                AND: {
                  OR: [
                    ...(registrationTypeArr.length > 0
                      ? registrationTypeArr.map((slug) => ({
                          registrationType: {
                            slug,
                          },
                        }))
                      : []),
                  ],

                  AND: {
                    OR: [
                      ...(languageArr.length > 0
                        ? languageArr.map((iso_639_1) => ({
                            language: {
                              iso_639_1,
                            },
                          }))
                        : []),
                    ],

                    AND: {
                      OR: [
                        ...(licenseArr.length > 0
                          ? licenseArr.map((slug) => ({
                              license: { slug },
                            }))
                          : []),
                      ],

                      AND: {
                        OR: [
                          ...(lpTypeArr.length > 0
                            ? lpTypeArr.map((slug) => ({
                                landingPageType: { slug },
                              }))
                            : []),
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        };

      case "OR":
        return {
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
            ...(topicArr.length > 0
              ? topicArr.map((slug) => ({
                  topic: {
                    slug,
                  },
                }))
              : []),
            ...(brandArr.length > 0
              ? brandArr.map((slug) => ({
                  brand: {
                    slug,
                  },
                }))
              : []),
            ...(registrationTypeArr.length > 0
              ? registrationTypeArr.map((slug) => ({
                  registrationType: {
                    slug,
                  },
                }))
              : []),
            ...(languageArr.length > 0
              ? languageArr.map((iso_639_1) => ({
                  language: {
                    iso_639_1,
                  },
                }))
              : []),
            ...(licenseArr.length > 0
              ? licenseArr.map((slug) => ({
                  license: { slug },
                }))
              : []),
            ...(lpTypeArr.length > 0
              ? lpTypeArr.map((slug) => ({
                  landingPageType: { slug },
                }))
              : []),
          ],
        };

      default:
        return {
          AND: {
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

            AND: {
              OR: [
                ...(topicArr.length > 0
                  ? topicArr.map((slug) => ({
                      topic: {
                        slug,
                      },
                    }))
                  : []),
              ],

              AND: {
                OR: [
                  ...(brandArr.length > 0
                    ? brandArr.map((slug) => ({
                        brand: {
                          slug,
                        },
                      }))
                    : []),
                ],

                AND: {
                  OR: [
                    ...(registrationTypeArr.length > 0
                      ? registrationTypeArr.map((slug) => ({
                          registrationType: {
                            slug,
                          },
                        }))
                      : []),
                  ],

                  AND: {
                    OR: [
                      ...(languageArr.length > 0
                        ? languageArr.map((iso_639_1) => ({
                            language: {
                              iso_639_1,
                            },
                          }))
                        : []),
                    ],

                    AND: {
                      OR: [
                        ...(licenseArr.length > 0
                          ? licenseArr.map((slug) => ({
                              license: { slug },
                            }))
                          : []),
                      ],

                      AND: {
                        OR: [
                          ...(lpTypeArr.length > 0
                            ? lpTypeArr.map((slug) => ({
                                landingPageType: { slug },
                              }))
                            : []),
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        };
    }
  };

  const landingPages = await getLandingPages(lpsWhere());

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
              operator={operator}
            />
          }
        />
      )}
    </PageStructure>
  );
};

export default LandingPagesPage;
