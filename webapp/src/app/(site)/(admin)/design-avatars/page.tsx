import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/design-avatars/components/table/colums";
import { getDesignAvatars } from "@/features/design-avatars/data/get-design-avatars";
import { IBreadcrumb } from "@/types/breadcrumb";

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
      <PageTtle label={"Design Avatars"} addBtnHref="/design-avatars/add" />
      {!designAvatars ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES("Design Avatars").CUSTOM_ALERT}
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
