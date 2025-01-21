import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { getDesignAvatars } from "@/features/design-avatars/data/get-design-avatars";
import { DesignEditForm } from "@/features/designs/components/form/design-edit";
import { getDesignBySlug } from "@/features/designs/data/get-design";
import { IBreadcrumb } from "@/types/breadcrumb";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      href: "/designs",
      label: "Designs",
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

  const design = await getDesignBySlug(designId);

  if (!design) notFound();

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
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          href: `/designs/${design.slug}`,
          label: "Edit " + design.name,
        })}
      />
      <PageTtle
        label={`Edit "${design?.name}"`}
        backBtnHref={`/designs/${design.slug}`}
      />

      <DesignEditForm design={design} avatars={designAvatars} />
    </PageStructure>
  );
};

export default EditDesignPage;
