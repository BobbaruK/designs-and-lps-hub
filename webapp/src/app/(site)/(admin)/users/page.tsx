import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { usersMeta } from "@/constants/page-titles/users";
import { columns } from "@/features/users/components/table/columns";
import { getUsers } from "@/features/users/data/get-user";
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
    href: usersMeta.href,
    label: usersMeta.label.plural,
  },
];

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={usersMeta.label.plural}
        addBtnHref={`${usersMeta.href}/add`}
      />
      {!users ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(usersMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable columns={columns} data={users} columnVisibilityObj={{}} />
      )}
    </PageStructure>
  );
};

export default UsersPage;
