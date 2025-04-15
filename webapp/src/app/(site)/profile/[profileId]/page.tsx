import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { profileMeta } from "@/constants/page-titles/profile";
import { currentUser } from "@/features/auth/lib/auth";
import { getLandingPagesCount } from "@/features/landing-pages/data/get-landing-pages";
import { UserSection } from "@/features/profile/components/user-section";
import { getUserByIdAndResources } from "@/features/users/data/get-user";
import { IBreadcrumb } from "@/types/breadcrumb";
import { UserRole } from "@prisma/client";
import { notFound } from "next/navigation";

const BREADCRUMBS = ({ href, label }: IBreadcrumb): IBreadcrumb[] => {
  return [
    {
      href: dashboardMeta.href,
      label: dashboardMeta.label.singular,
    },
    {
      label: profileMeta.label.singular,
    },
    {
      href,
      label,
    },
  ];
};

interface Props {
  params: Promise<{
    profileId: string;
  }>;
}

const ProfilePage = async ({ params }: Props) => {
  const { profileId } = await params;

  const sessionUser = await currentUser();

  const user = await getUserByIdAndResources(profileId);

  if (!user) notFound();

  const lpCount = await getLandingPagesCount();

  return (
    <PageStructure>
      <PageBreadcrumbs
        crumbs={BREADCRUMBS({
          label: user.name,
          href: `/profile/${user.id}`,
        })}
      />
      <PageTitle
        label={user.name}
        editBtnHref={
          sessionUser?.role === UserRole.ADMIN ? `/users/${user.id}` : undefined
        }
      />

      <UserSection user={user} lpCount={lpCount || 0} />
    </PageStructure>
  );
};

export default ProfilePage;
