import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { flagsMeta } from "@/constants/page-titles/flags";
import { FlagAddForm } from "@/features/flags/components/form/flag-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: flagsMeta.href,
    label: flagsMeta.label.plural,
  },
  {
    href: `${flagsMeta.href}/add`,
    label: `Add ${flagsMeta.label.singular}`,
  },
];

const AddFlagPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTtle
        label={`Add ${flagsMeta.label.singular}`}
        backBtnHref={flagsMeta.href}
      />

      <FlagAddForm />
    </PageStructure>
  );
};

export default AddFlagPage;
