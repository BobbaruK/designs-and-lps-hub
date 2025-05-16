import { cn } from "@/lib/utils";
import { FaTrafficLight } from "react-icons/fa";

interface Props {
  isSuccess?: boolean;
}

export const IconTraffic = ({ isSuccess }: Props) => {
  return (
    <FaTrafficLight
      size={20}
      className={cn(
        isSuccess ? "text-success" : isSuccess === false ? "text-danger" : "",
      )}
    />
  );
};
