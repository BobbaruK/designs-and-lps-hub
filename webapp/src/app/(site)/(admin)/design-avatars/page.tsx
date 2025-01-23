import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { columns } from "@/features/design-avatars/components/table/columns";
import { getDesignAvatars } from "@/features/design-avatars/data/get-design-avatars";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    label: "Admin",
  },
  {
    href: designAvatarsMeta.href,
    label: designAvatarsMeta.label.plural,
  },
];

const DesignAvatarsPage = async () => {
  const designAvatars = await getDesignAvatars();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={designAvatarsMeta.label.plural}
        addBtnHref={`${designAvatarsMeta.href}/add`}
      />
      {!designAvatars ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(designAvatarsMeta.label.plural).CUSTOM_ALERT
          }
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
