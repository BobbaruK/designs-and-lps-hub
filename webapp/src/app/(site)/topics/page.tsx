import { CustomAlert } from "@/components/custom-alert";
import { DataTable } from "@/components/data-table";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { columns } from "@/features/topics/components/table/colums";
import { getTopics } from "@/features/topics/data/get-topics";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
  {
    href: "/topics",
    label: "Topics",
  },
];

const FormValidationPage = async () => {
  const topics = await getTopics();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label="Topics" addBtnHref="/topics/add" />
      {!topics ? (
        <CustomAlert
          title={"Error!"}
          description={ACTION_MESSAGES("Topics").CUSTOM_ALERT}
          variant="destructive"
        />
      ) : (
        <DataTable
          columns={columns}
          data={topics}
          columnVisibilityObj={{
            slug: false,
            description: false,
          }}
        />
      )}
    </PageStructure>
  );
};

export default FormValidationPage;
