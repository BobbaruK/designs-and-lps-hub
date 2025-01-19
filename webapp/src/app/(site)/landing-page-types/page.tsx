import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/landing-page-types/components/table/colums";
import { getLandingPageTypes } from "@/features/landing-page-types/data/get-landing-page-types";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/landing-page-types",
    label: "Landing Page Types",
  },
];

const LandingPageTypesPage = async () => {
  const landingPageTypes = await getLandingPageTypes();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label="Landing Page Types"
        addBtnHref="/landing-page-types/add"
      />
      {!landingPageTypes ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES("Landing Page Types").CUSTOM_ALERT}
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
      )}
    </PageStructure>
  );
};

export default LandingPageTypesPage;
