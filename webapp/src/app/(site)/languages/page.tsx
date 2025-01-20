import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/languages/components/table/colums";
import { getLanguages } from "@/features/languages/data/get-languages";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/languages",
    label: "Languages",
  },
];

const LanguagesPage = async () => {
  const languages = await getLanguages();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Languages" addBtnHref="/languages/add" />
      {!languages ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES("Languages").CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={languages}
          columnVisibilityObj={{}}
        />
      )}
    </PageStructure>
  );
};

export default LanguagesPage;
