import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { featuresTypeMeta } from "@/constants/page-titles/features";
import { columns } from "@/features/landing-page-features/components/table/columns";
import { getLandingPageFeatures } from "@/features/landing-page-features/data/get-landing-page-features";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: featuresTypeMeta.href,
    label: capitalizeFirstLetter(featuresTypeMeta.label.plural),
  },
];

const LandingPageFeaturesPage = async () => {
  const lpFeatures = await getLandingPageFeatures();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTtle
        label={capitalizeFirstLetter(featuresTypeMeta.label.plural)}
        addBtnHref={`${featuresTypeMeta.href}/add`}
      />
      {!lpFeatures ? (
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
          data={lpFeatures}
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

export default LandingPageFeaturesPage;
