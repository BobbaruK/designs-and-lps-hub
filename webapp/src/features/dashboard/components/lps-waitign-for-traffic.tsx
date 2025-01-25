import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { LandingPageLegend } from "@/features/landing-pages/components/landing-page-legend";
import { LandingPagesWaitingForTrafficArr } from "@/types/landing-pages";
import { lpsWaitingForTrafficColumns } from "./table/lps-waiting-for-traffic-columns";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  lps: LandingPagesWaitingForTrafficArr;
}

export const LPsWaitingForTraffic = ({ lps, ...restProps }: Props) => {
  return (
    <Card {...restProps}>
      <CardHeader>
        <CardTitle>
          {landingPagesMeta.label.plural} waiting for traffic
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={lpsWaitingForTrafficColumns}
          data={lps || []}
          columnVisibilityObj={{}}
          showColumnSelector={false}
          showSearch={false}
          showPagination={false}
          legendItems={<LandingPageLegend />}
          legendFooter="or"
        />
      </CardContent>
    </Card>
  );
};
