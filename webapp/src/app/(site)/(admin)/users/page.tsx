import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { columns } from "@/features/users/components/table/columns";
import { getUsers } from "@/features/users/data/get-user";
import { IBreadcrumb } from "@/types";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    label: "Admin",
  },
  {
    href: "/users",
    label: "Users",
  },
];

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={"Users"} addBtnHref="/users/add" />
      {!users ? (
        <CustomAlert
          title={"Error!"}
          description={`Something went wrong. Users does not return any data.`}
          variant="destructive"
        />
      ) : (
        <DataTable columns={columns} data={users} columnVisibilityObj={{}} />
      )}
    </PageStructure>
  );
};

export default UsersPage;