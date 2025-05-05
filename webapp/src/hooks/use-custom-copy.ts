import { ReactNode } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

export const useCustomCopy = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy =
    ({
      text,
      toastError,
      toastSuccess,
    }: {
      text: string;
      toastSuccess: ReactNode;
      toastError: ReactNode;
    }) =>
    () => {
      copy(text)
        .then(() => toast.info(toastSuccess))
        .catch((error) => {
          console.error("Failed to copy!", error);
          toast.error(toastError);
        });
    };

  return {
    handleCopy,
  };
};
