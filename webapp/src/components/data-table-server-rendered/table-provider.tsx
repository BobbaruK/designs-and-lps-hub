import { Update_LPs } from "@/types/db/landing-pages";
import { TableRowSelect } from "@/types/table-row-select";
import React, { TransitionStartFunction, useContext } from "react";

type TableContextType = {
  handleDelete: () => void;
  handleUpdate: (values: Update_LPs) => void;
  dataSelected: TableRowSelect;
  dataCount: number;
  showSearchSwitch?: boolean;
  isLoading: boolean;
  startTransition: TransitionStartFunction;
};

const TableContext = React.createContext<TableContextType>({
  handleDelete: () => {},
  handleUpdate: () => {},
  dataSelected: {} as TableRowSelect,
  dataCount: 0,
  isLoading: false,
  startTransition: () => {},
});

export const useTableContext = () => {
  return useContext(TableContext);
};

interface Props extends TableContextType {
  children: React.ReactNode;
}

const TableProvider = ({
  children,
  handleDelete,
  handleUpdate,
  dataSelected,
  dataCount,
  showSearchSwitch,
  isLoading,
  startTransition,
}: Props) => {
  return (
    <TableContext.Provider
      value={{
        handleDelete,
        handleUpdate,
        dataSelected: dataSelected || ({} as TableRowSelect),
        dataCount: dataCount || 0,
        isLoading,
        startTransition,
        showSearchSwitch,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
