import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { DB_LandingPage } from "@/types/db/landing-pages";
import { top5LPsColumns } from "./table/top-5-lps-columns";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  lastLPs: DB_LandingPage[];
}

export const LastLPsAddedSection = ({ lastLPs, ...restProps }: Props) => {
  return (
    <Card {...restProps}>
      <CardHeader>
        <CardTitle>
          Last {landingPagesMeta.label.plural.toLowerCase()} added
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={top5LPsColumns}
          data={lastLPs || []}
          columnVisibilityObj={{}}
          showColumnSelector={false}
          showSearch={false}
          showPagination={false}
        />
      </CardContent>
    </Card>
  );
};
