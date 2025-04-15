import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { AddDesignAvatarForm } from "@/features/design-avatars/components/form/design-avatar-add";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    label: "Admin",
  },
  {
    href: designAvatarsMeta.href,
    label: designAvatarsMeta.label.plural,
  },
  {
    href: `${designAvatarsMeta.href}/add`,
    label: `Add ${designAvatarsMeta.label.singular}`,
  },
];

const AddDesignAvatarPage = () => {
  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTtle
        label={`Add ${designAvatarsMeta.label.singular}`}
        backBtnHref={designAvatarsMeta.href}
      />

      <AddDesignAvatarForm />
    </PageStructure>
  );
};

export default AddDesignAvatarPage;
