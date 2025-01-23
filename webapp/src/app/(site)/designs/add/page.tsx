import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { designsMeta } from "@/constants/page-titles/designs";
import { getDesignAvatars } from "@/features/design-avatars/data/get-design-avatars";
import { DesignAddForm } from "@/features/designs/components/form/designs-add";
import { redirectUser } from "@/lib/redirect-user";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
  {
    href: designsMeta.href,
    label: designsMeta.label.plural,
  },
  {
    href: `${designsMeta.href}/add`,
    label: `Add ${designsMeta.label.singular}`,
  },
];

const AddBrandPage = async () => {
  await redirectUser(designsMeta.href);

  const designAvatars = await getDesignAvatars();

  if (!designAvatars)
    return (
      <CustomAlert
        title={"Error!"}
        description={ACTION_MESSAGES("Design Avatars").CUSTOM_ALERT}
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Add ${designsMeta.label.singular}`}
        backBtnHref={designsMeta.href}
      />

      <DesignAddForm designAvatars={designAvatars} />
    </PageStructure>
  );
};

export default AddBrandPage;
