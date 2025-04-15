import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { languagesMeta } from "@/constants/page-titles/languages";
import { columns } from "@/features/languages/components/table/columns";
import { getLanguages } from "@/features/languages/data/get-languages";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: languagesMeta.href,
    label: capitalizeFirstLetter(languagesMeta.label.plural),
  },
];

const LanguagesPage = async () => {
  const languages = await getLanguages();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle
        label={capitalizeFirstLetter(languagesMeta.label.plural)}
        addBtnHref={`${languagesMeta.href}/add`}
      />
      {!languages ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES(languagesMeta.label.plural).CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={languages}
          columnVisibilityObj={{
            // createdAt: false,
            // createdBy: false,
            updatedAt: false,
            updatedBy: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default LanguagesPage;
