import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { columns } from "@/features/brand-logos/components/table/colums";
import { getBrandLogos } from "@/features/brand-logos/data/get-brand-logos";
import { IBreadcrumb } from "@/types/breadcrumb";

const BrandLogosPage = async () => {
  const BREADCRUMBS: IBreadcrumb[] = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Admin",
    },
    {
      href: "/brand-logos",
      label: "Brand Logos",
    },
  ];

  const brandLogos = await getBrandLogos();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={"Brand Logos"} addBtnHref="/brand-logos/add" />
      {!brandLogos ? (
        // TODO: centralize error message
        <CustomAlert
          title={"Error!"}
          description={`Something went wrong. Brand Logos do not return any data.`}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={brandLogos}
          columnVisibilityObj={{}}
        />
      )}
    </PageStructure>
  );
};

export default BrandLogosPage;
