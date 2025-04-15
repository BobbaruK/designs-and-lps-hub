import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { currentUser } from "@/features/auth/lib/auth";
import { LandingPagesAndDesigns } from "@/features/dashboard/components/landing-pages-and-designs";
import { LanguagesWithMostLPs } from "@/features/dashboard/components/languages-with-most-lps";
import { LastLPsAddedSection } from "@/features/dashboard/components/last-lps-added";
import { LPsWaitingForTraffic } from "@/features/dashboard/components/lps-waitign-for-traffic";
import { TopRequesters } from "@/features/dashboard/components/top-requesters";
import { getDesignsCount } from "@/features/designs/data/get-designs";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import {
  getLandingPagesCount,
  getLastLandingPages,
  getLastLPsWaitingForTraffic,
} from "@/features/landing-pages/data/get-landing-pages";
import { getLanguagesWithMostLPs } from "@/features/languages/data/get-languages";
import { getTopRequesters } from "@/features/users/data/get-user";
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
  const requesters = await getTopRequesters();
  const lpsWaitingForTraffic = await getLastLPsWaitingForTraffic();
  const langWithMostLPs = await getLanguagesWithMostLPs();

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={BREADCRUMBS} />
      <PageTitle label={user ? `Hello, ${user.name}! 👋` : `Hello! 👋`} />

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
            <LPsWaitingForTraffic
              lps={lpsWaitingForTraffic}
              tableLegend={<LandingPageLegend />}
              className="col-span-full @5xl/dashboard:col-span-2 @7xl/dashboard:col-span-3"
            />
            <LandingPagesAndDesigns
              designsCount={designsCount || 0}
              lpsCount={lpsCount || 0}
            />
            <LanguagesWithMostLPs
              languages={langWithMostLPs || []}
              className="@5xl/dashboard:col-span-1 @7xl:col-span-2"
            />
            <TopRequesters
              requesters={requesters}
              className="@3xl/dashboard:col-span-full @5xl/dashboard:col-span-2 @7xl/dashboard:col-span-2"
            />
            <LastLPsAddedSection
              lastLPs={last5LPs}
              className="@3xl/dashboard:col-span-full @7xl/dashboard:col-span-full"
            />
          </div>
        </div>
      )}
    </PageStructure>
  );
};

export default DashboardPage;
