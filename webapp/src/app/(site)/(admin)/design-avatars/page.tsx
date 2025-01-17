import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { columns } from "@/features/design-avatars/components/table/colums";
import { getDesignAvatars } from "@/features/design-avatars/data/get-design-avatars";
import { IBreadcrumb } from "@/types";

const DesignAvatarsPage = async () => {
  const BREADCRUMBS: IBreadcrumb[] = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Admin",
    },
    {
      href: "/design-avatars",
      label: "Design Avatars",
    },
  ];

  const designAvatars = await getDesignAvatars();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={"Design avatars"} addBtnHref="/design-avatars/add" />
      {!designAvatars ? (
        <CustomAlert
          title={"Error!"}
          description={`Something went wrong. Design Avatars do not return any data.`}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={designAvatars}
          columnVisibilityObj={{}}
        />
      )}
    </PageStructure>
  );
};

export default DesignAvatarsPage;
