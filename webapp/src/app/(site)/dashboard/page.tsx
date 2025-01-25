import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTtle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { currentUser } from "@/features/auth/lib/auth";
import { LandingPagesAndDesigns } from "@/features/dashboard/components/landing-pages-and-designs";
import { LastLPsAddedSection } from "@/features/dashboard/components/last-lps-added";
import { getDesignsCount } from "@/features/designs/data/get-designs";
import {
  getLandingPagesCount,
  getLastLandingPages,
} from "@/features/landing-pages/data/get-landing-pages";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
];

const DashboardPage = async () => {
  const user = await currentUser();

  const last5LPs = await getLastLandingPages(5);
  const lpsCount = await getLandingPagesCount();
  const designsCount = await getDesignsCount();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTtle label={user ? `Hello, ${user.name}! 👋` : `Hello! 👋`} />

      <div>
        <ol>
          <li>top requesters</li>
          <li>Bar Chart - Mixed - languages with most lps</li>
          <li>LPs waiting for traffic</li>
        </ol>
      </div>

      {!user ? (
        <CustomAlert
          title={"Error!"}
          description={
            ACTION_MESSAGES(dashboardMeta.label.singular).CUSTOM_ALERT
          }
          variant="destructive"
        />
      ) : (
        <div className="@container/dashboard">
          <div className="grid grid-cols-1 gap-4 @3xl/dashboard:grid-cols-2 @5xl/dashboard:grid-cols-3 @7xl/dashboard:grid-cols-4 sm:gap-6">
            <LastLPsAddedSection
              lastLPs={last5LPs}
              className="col-span-full @7xl/dashboard:col-span-3"
            />
            <LandingPagesAndDesigns
              designsCount={designsCount || 0}
              lpsCount={lpsCount || 0}
            />
            <LastLPsAddedSection lastLPs={last5LPs} />
            <LastLPsAddedSection
              lastLPs={last5LPs}
              className="col-span-full @5xl/dashboard:col-span-1"
            />
            <LastLPsAddedSection
              lastLPs={last5LPs}
              className="col-span-full @7xl/dashboard:col-span-2"
            />
          </div>
        </div>
      )}
    </PageStructure>
  );
};

export default DashboardPage;
