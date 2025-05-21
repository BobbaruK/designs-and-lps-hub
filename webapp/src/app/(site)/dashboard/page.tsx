import { CustomAlert } from "@/components/custom-alert";
import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { LandingPageLegend } from "@/components/table/landing-pages/landing-page-legend";
import { ACTION_MESSAGES } from "@/constants/messages";
import { dashboardMeta } from "@/constants/page-titles/dashboard";
import { currentUser } from "@/features/auth/lib/auth";
import { LandingPagesAndDesigns } from "@/features/dashboard/components/landing-pages-and-designs";
import { LanguagesWithMostLPs } from "@/features/dashboard/components/languages-with-most-lps";
import { LastLPsAddedSection } from "@/features/dashboard/components/last-lps-added";
import { LPsCreatedPeriod } from "@/features/dashboard/components/lps-created-period";
// import { LastLPsAddedSection } from "@/features/dashboard/components/last-lps-added";
import { LPsWaitingForTraffic } from "@/features/dashboard/components/lps-waitign-for-traffic";
import { MostPopularDesigns } from "@/features/dashboard/components/most-popular-designs";
import {
  getDesigns,
  getDesignsCount,
} from "@/features/designs/data/get-designs";
import {
  getLandingPages,
  getLandingPagesFilteredCount,
} from "@/features/landing-pages/data/get-landing-pages";
import { getLanguages } from "@/features/languages/data/get-languages";
import { IBreadcrumb } from "@/types/breadcrumb";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: dashboardMeta.href,
    label: dashboardMeta.label.singular,
  },
];

const DashboardPage = async () => {
  const user = await currentUser();

  const designs = await getDesigns({
    perPage: 3,
    orderBy: {
      landingPages: {
        _count: "desc",
      },
    },
  });
  const lpsWaitingForTraffic = await getLandingPages({
    where: {
      isReadyForTraffic: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    perPage: 5,
  });
  const designsCount = await getDesignsCount();
  const lpsCount = await getLandingPagesFilteredCount();
  const langWithMostLPs = await getLanguages({
    orderBy: {
      landingPages: {
        _count: "desc",
      },
    },
    perPage: 5,
  });
  const lastLps = await getLandingPages({
    perPage: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  // LPsCreatedPeriod
  const newDate = new Date();
  newDate.setDate(newDate.getDate() - 90);

  const threeMonthsLPs = await getLandingPages({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      createdAt: {
        gte: newDate,
      },
    },
  });

  const threeMonthsDesigns = await getDesigns({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      createdAt: {
        gte: newDate,
      },
    },
  });
  // END LPsCreatedPeriod

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
            <MostPopularDesigns designs={designs} className="col-span-full" />

            <LPsCreatedPeriod
              className="col-span-full @5xl/dashboard:col-span-2 @7xl/dashboard:col-span-3"
              designs={threeMonthsDesigns}
              landingPages={threeMonthsLPs}
            />

            <LandingPagesAndDesigns
              designsCount={designsCount || 0}
              lpsCount={lpsCount || 0}
            />

            <LanguagesWithMostLPs
              languages={langWithMostLPs || []}
              className="@5xl/dashboard:col-span-1 @7xl:col-span-2"
            />

            <LPsWaitingForTraffic
              lps={lpsWaitingForTraffic || []}
              tableLegend={<LandingPageLegend />}
              className="@3xl/dashboard:col-span-full @5xl/dashboard:col-span-2 @7xl/dashboard:col-span-2"
            />

            <LastLPsAddedSection
              lastLPs={lastLps || []}
              className="@3xl/dashboard:col-span-full @7xl/dashboard:col-span-full"
            />
          </div>
        </div>
      )}
    </PageStructure>
  );
};

export default DashboardPage;
