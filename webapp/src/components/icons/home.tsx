import { cn } from "@/lib/utils";
import { TiHome } from "react-icons/ti";

interface Props {
  isSuccess?: boolean;
}

export const IconHome = ({ isSuccess }: Props) => {
  return (
    <TiHome
      size={20}
      className={cn(
        isSuccess ? "text-success" : isSuccess === false ? "text-danger" : "",
      )}
    />
  );
};
