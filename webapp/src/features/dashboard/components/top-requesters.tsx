import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequesterArr } from "@/types/requesters";
import { requestersColumns } from "./table/reuqesters-columns";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  requesters: RequesterArr;
}

export const TopRequesters = ({ requesters, ...restProps }: Props) => {
  return (
    <Card {...restProps}>
      <CardHeader>
        <CardTitle>Top 5 requesters</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={requestersColumns}
          data={requesters || []}
          columnVisibilityObj={{}}
          showColumnSelector={false}
          showSearch={false}
          showPagination={false}
        />
      </CardContent>
    </Card>
  );
};
