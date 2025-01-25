import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LastLandingPagesAddedArr } from "@/types/landing-pages";
import { columns } from "./table/columns";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  lastLPs: LastLandingPagesAddedArr;
}

export const LastLPsAddedSection = ({ lastLPs, ...restProps }: Props) => {
  return (
    <Card {...restProps}>
      <CardHeader>
        <CardTitle>Last 5 lps added</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
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
