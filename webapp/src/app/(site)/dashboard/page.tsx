import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { currentUser } from "@/features/auth/lib/auth";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: "/dashboard",
    label: "Home",
  },
];

const DashboardPage = async () => {
  const user = await currentUser();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={user ? `Hello, ${user.name}! 👋` : `Hello!`} />
      <div>Dashboard</div>
    </PageStructure>
  );
};

export default DashboardPage;
