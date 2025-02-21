import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { columns } from "@/features/landing-pages/components/table/landing-page-columns";
import { getLandingPages } from "@/features/landing-pages/data/get-landing-pages";
import { filtering } from "@/features/landing-pages/utils/filtering";
import { IBreadcrumb } from "@/types/breadcrumb";
import { LP_SearchParams } from "@/types/landing-pages";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: landingPagesMeta.href,
    label: landingPagesMeta.label.plural,
  },
];

interface Props {
  searchParams: LP_SearchParams;
}

const LandingPagesPage = async ({ searchParams }: Props) => {
  const { feature, foperator, topic } = await searchParams;

  const landingPages = await getLandingPages(
    filtering({ feature, foperator, topic }),
  );

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={landingPagesMeta.label.plural}
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
        />
      )}
    </PageStructure>
  );
};

export default LandingPagesPage;
