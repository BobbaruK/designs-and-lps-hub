import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { brandsMeta } from "@/constants/page-titles/brands";
import { columns } from "@/features/brands/components/table/columns";
import { getBrands } from "@/features/brands/data/get-brands";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: brandsMeta.href,
    label: capitalizeFirstLetter(brandsMeta.label.plural),
  },
];

const BrandsPage = async () => {
  const brands = await getBrands();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={brandsMeta.label.plural}
        addBtnHref={`${brandsMeta.href}/add`}
      />
      {!brands ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(brandsMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={brands}
          columnVisibilityObj={{
            slug: false,
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

export default BrandsPage;
