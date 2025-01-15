import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { columns } from "@/features/user-avatars/components/table/columns";
import { getUserAvatars } from "@/features/user-avatars/data/get-user-avatars";
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
    href: "/user-avatar",
    label: "User Avatars",
  },
];

const UserAvatarsPage = async () => {
  const userAvatars = await getUserAvatars();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={"User Avatars"} addBtnHref="/user-avatars/add" />
      {!userAvatars ? (
        <CustomAlert
          title={"Error!"}
          description={`Something went wrong. Users does not return any data.`}
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
