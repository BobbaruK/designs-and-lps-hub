import { cn } from "@/lib/utils";
import { TbBrandAstro } from "react-icons/tb";

interface Props {
  isSuccess?: boolean;
}

export const IconAstro = ({ isSuccess }: Props) => {
  return (
    <TbBrandAstro
      size={20}
      className={cn(
        isSuccess ? "text-success" : isSuccess === false ? "text-danger" : "",
      )}
    />
  );
};
