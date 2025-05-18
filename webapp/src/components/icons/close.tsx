import { cn } from "@/lib/utils";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface Props {
  isSuccess?: boolean;
}

export const IconClose = ({ isSuccess }: Props) => {
  return (
    <IoIosCloseCircleOutline
      size={20}
      className={cn(
        isSuccess ? "text-success" : isSuccess === false ? "text-danger" : "",
      )}
    />
  );
};
