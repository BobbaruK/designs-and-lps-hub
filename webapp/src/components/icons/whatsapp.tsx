import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";

interface Props {
  isSuccess?: boolean;
}

export const IconWhatsapp = ({ isSuccess }: Props) => {
  return (
    <FaWhatsapp
      size={20}
      className={cn(
        isSuccess ? "text-success" : isSuccess === false ? "text-danger" : "",
      )}
    />
  );
};
