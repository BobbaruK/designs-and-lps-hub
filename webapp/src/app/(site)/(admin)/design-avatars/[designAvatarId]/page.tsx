import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { DesignAvatarEditForm } from "@/features/design-avatars/components/form/design-avatar-edit";
import { getDesignAvatarById } from "@/features/design-avatars/data/get-design-avatar";
import { IBreadcrumb } from "@/types";

interface Props {
  params: Promise<{
    designAvatarId: string;
  }>;
}

const DesignAvatarPage = async ({ params }: Props) => {
  const { designAvatarId } = await params;

  const designAvatar = await getDesignAvatarById(designAvatarId);

  const BREADCRUMBS: IBreadcrumb[] = [
    {
      href: "/dashboard",
      label: "Home",
    },
    {
      label: "Admin",
    },
    {
      href: "/design-avatars",
      label: "Design Avatars",
    },
    {
      href: `/design-avatars/${designAvatarId}`,
      label: designAvatar?.name || "Design Avatar Unknown",
    },
  ];

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle
        label={`Edit Design Avatar "${designAvatar?.name || "Design Avatar Unknown"}"`}
        backBtnHref="/design-avatars"
      />

      {!designAvatar ? (
        <CustomAlert
          title={"Error!"}
          description={`Seems like the Design Avatar that you are looking for does not exist.`}
          variant="destructive"
        />
      ) : (
        <DesignAvatarEditForm designAvatar={designAvatar} />
      )}
    </PageStructure>
  );
};

export default DesignAvatarPage;
