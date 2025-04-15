import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { IBreadcrumb } from "@/types/breadcrumb";

export const breadCrumbsFn = (breadcrumbArr: IBreadcrumb[]): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },

    ...breadcrumbArr,
  ];
};
