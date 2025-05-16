import { cn } from "@/lib/utils";
import { LuPickaxe } from "react-icons/lu";

interface Props {
  isSuccess?: boolean;
}

export const IconPickaxe = ({ isSuccess }: Props) => {
  return (
    <LuPickaxe
      size={20}
      className={cn(
        isSuccess ? "text-success" : isSuccess === false ? "text-danger" : "",
      )}
    />
  );
};
