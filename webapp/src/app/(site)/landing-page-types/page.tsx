import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { landingPageTypeMeta } from "@/constants/page-titles/landing-page-type";
import { columns } from "@/features/landing-page-types/components/table/columns";
import { getLandingPageTypes } from "@/features/landing-page-types/data/get-landing-page-types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: landingPageTypeMeta.href,
    label: capitalizeFirstLetter(landingPageTypeMeta.label.plural),
  },
];

const LandingPageTypesPage = async () => {
  const landingPageTypes = await getLandingPageTypes();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={capitalizeFirstLetter(landingPageTypeMeta.label.plural)}
        addBtnHref={`${landingPageTypeMeta.href}/add`}
      />
      {!landingPageTypes ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(landingPageTypeMeta.label.plural).CUSTOM_ALERT
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
            // createdAt: false,
            // createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default LandingPageTypesPage;
