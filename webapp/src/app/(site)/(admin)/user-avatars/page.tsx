import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { userAvatarMeta } from "@/constants/page-titles/user-avatars";
import { columns } from "@/features/user-avatars/components/table/columns";
import { getUserAvatars } from "@/features/user-avatars/data/get-user-avatars";
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
    href: userAvatarMeta.href,
    label: userAvatarMeta.label.plural,
  },
];

const UserAvatarsPage = async () => {
  const userAvatars = await getUserAvatars();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={userAvatarMeta.label.plural}
        addBtnHref={`${userAvatarMeta.href}/add`}
      />
      {!userAvatars ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(userAvatarMeta.label.plural).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={userAvatars}
          columnVisibilityObj={{}}
        />
      )}
    </PageStructure>
  );
};

export default UserAvatarsPage;
