import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { columns } from "@/features/landing-page-types/components/table/columns";
import { getLandingPageTypes } from "@/features/landing-page-types/data/get-landing-page-types";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: featuresTypeMeta.href,
    label: featuresTypeMeta.label.plural,
  },
];

const LandingPageTypesPage = async () => {
  // const landingPageTypes = await getLandingPageTypes();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={featuresTypeMeta.label.plural}
        addBtnHref={`${featuresTypeMeta.href}/add`}
      />
      {/* {!landingPageTypes ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(featuresTypeMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={landingPageTypes}
          columnVisibilityObj={{
            slug: false,
            description: false,
          }}
        />
      )} */}
    </PageStructure>
  );
};

export default LandingPageTypesPage;
