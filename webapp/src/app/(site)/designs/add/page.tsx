import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { designsMeta } from "@/constants/page-titles/designs";
import { getDesignAvatars } from "@/features/design-avatars/data/get-design-avatars";
import { DesignAddForm } from "@/features/designs/components/form/designs-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: designsMeta.href,
    label: capitalizeFirstLetter(designsMeta.label.plural),
  },
  {
    href: `${designsMeta.href}/add`,
    label: `Add ${designsMeta.label.singular.toLowerCase()}`,
  },
];

const AddBrandPage = async () => {
  await redirectUser(designsMeta.href);

  const designAvatars = await getDesignAvatars();

  if (!designAvatars)
    return (
      <CustomAlert
        title={"Error!"}
        description={
          ACTION_MESSAGES(designAvatarsMeta.label.plural).CUSTOM_ALERT
        }
        variant="destructive"
      />
    );

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTtle
        label={`Add ${designsMeta.label.singular.toLowerCase()}`}
        backBtnHref={designsMeta.href}
      />

      <DesignAddForm designAvatars={designAvatars} />
    </PageStructure>
  );
};

export default AddBrandPage;
