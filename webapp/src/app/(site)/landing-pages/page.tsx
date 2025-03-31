import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { getLandingPageFeatures } from "@/features/landing-page-features/data/get-landing-page-features";
import { LandingPageFiltering } from "@/features/landing-pages/components/landing-page-filtering";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { getLandingPages } from "@/features/landing-pages/data/get-landing-pages";
import { filtering } from "@/features/landing-pages/utils/filtering";
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

  const landingPages = await getLandingPages(
    filtering({ feature, foperator, topic }),
  );

  const features = await getLandingPageFeatures({
    id: true,
    slug: true,
    name: true,
  });

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
              features={features || undefined}
              searchParams={{ feature, foperator, topic }}
            />
          }
        />
      )}
    </PageStructure>
  );
};

export default LandingPagesPage;
