import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { IBreadcrumb } from "@/types";
import React from "react";

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

const UsersPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={"Users"} />
      <div>Users</div>
    </PageStructure>
  );
};

export default UsersPage;
