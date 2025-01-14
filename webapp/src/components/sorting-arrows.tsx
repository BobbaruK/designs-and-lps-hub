import { SortDirection } from "@tanstack/react-table";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { LuChevronsUpDown } from "react-icons/lu";

interface Props {
  sort: false | SortDirection;
}

export const SortingArrows = ({ sort }: Props) => {
  if (sort === "asc") return <FaChevronUp />;
  if (sort === "desc") return <FaChevronDown />;
  return <LuChevronsUpDown />;
};
