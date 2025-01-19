import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { LicenseAddForm } from "@/features/licenses/components/form/licenses-add";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/licenses",
    label: "Licenses",
  },
  {
    href: "/licenses/add",
    label: "Add License",
  },
];

const AddTopicPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Add License" backBtnHref="/licenses" />

      <LicenseAddForm />
    </PageStructure>
  );
};

export default AddTopicPage;
