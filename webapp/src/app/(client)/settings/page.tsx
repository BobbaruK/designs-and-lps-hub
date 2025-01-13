"use client";

import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { SettingsForm } from "@/features/settings/components";
import { IBreadcrumb } from "@/types";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

const SettingsPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Settings" />
      <SettingsForm />
    </PageStructure>
  );
};

export default SettingsPage;
