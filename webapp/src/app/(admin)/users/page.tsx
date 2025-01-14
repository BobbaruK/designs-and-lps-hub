import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { IBreadcrumb } from "@/types";
import React from "react";
import { getUsers } from "@/features/users/data/get-user";
import { columns } from "@/features/users/components/table/columns";

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
      <PageTtle label={"Users"} />

      <DataTable columns={columns} data={users!} columnVisibilityObj={{}} />
    </PageStructure>
  );
};

export default UsersPage;
