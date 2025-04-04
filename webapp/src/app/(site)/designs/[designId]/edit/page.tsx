import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { designsMeta } from "@/constants/page-titles/designs";
import { getDesignAvatars } from "@/features/design-avatars/data/get-design-avatars";
import { DesignEditForm } from "@/features/designs/components/form/design-edit";
import { getDesignBySlug } from "@/features/designs/data/get-design";
import { redirectUser } from "@/lib/redirect-user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      href: designsMeta.href,
      label: capitalizeFirstLetter(designsMeta.label.plural),
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    designId: string;
  }>;
}

const EditDesignPage = async ({ params }: Props) => {
  const { designId } = await params;

  const designHref = `${designsMeta.href}/${designId}`;

  await redirectUser(designHref);

  const design = await getDesignBySlug(designId);

  if (!design) notFound();

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
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: designHref,
          label: `Edit ${designsMeta.label.singular.toLowerCase()} "${design.name}"`,
        })}
      />
      <PageTtle
        label={`Edit ${designsMeta.label.singular.toLowerCase()} "${design.name}"`}
        backBtnHref={designHref}
      />

      <DesignEditForm design={design} avatars={designAvatars} />
    </PageStructure>
  );
};

export default EditDesignPage;
