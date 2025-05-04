import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { capitalizeFirstLetter } from "@/lib/utils";
import { LandingPagesWaitingForTrafficArr } from "@/types/landing-pages";
import { ReactNode } from "react";
import { lpsWaitingForTrafficColumns } from "./table/lps-waiting-for-traffic-columns";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  lps: LandingPagesWaitingForTrafficArr;
  tableLegend?: ReactNode;
}

export const LPsWaitingForTraffic = ({
  lps,
  tableLegend,
  ...restProps
}: Props) => {
  return (
    <Card {...restProps}>
      <CardHeader>
        <CardTitle>
          {capitalizeFirstLetter(landingPagesMeta.label.plural)} waiting for
          traffic
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
          legendItems={tableLegend}
          legendFooter="or"
        />
      </CardContent>
    </Card>
  );
};
