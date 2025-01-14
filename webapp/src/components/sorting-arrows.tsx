import { SortDirection } from "@tanstack/react-table";
import {
  PiArrowBendRightDownDuotone,
  PiArrowBendRightUpDuotone,
} from "react-icons/pi";

interface Props {
  sort: false | SortDirection;
}

export const SortingArrows = ({ sort }: Props) => {
  if (sort === "asc") return <PiArrowBendRightUpDuotone size={20} />;
  if (sort === "desc") return <PiArrowBendRightDownDuotone size={20} />;
  return null;
};
