import { cn } from "@/lib/utils";
import { BsCheckCircle } from "react-icons/bs";

interface Props {
  isSuccess?: boolean;
}

export const IconCheck = ({ isSuccess }: Props) => {
  return (
    <BsCheckCircle
      size={20}
      className={cn(
        isSuccess ? "text-success" : isSuccess === false ? "text-danger" : "",
      )}
    />
  );
};
