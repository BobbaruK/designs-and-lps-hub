"use client";

import { BUTTON_EFFECT } from "@/constants/button";
import { ACTION_MESSAGES } from "@/constants/messages";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";
import { Button, ButtonProps } from "./ui/button";

interface Props extends ButtonProps {
  data: string;
}

export const CopyToClipboard = ({ data, ...props }: Props) => {
  const copyAndToast = async () => {
    try {
      await navigator.clipboard.writeText(data);

      toast.info(
        <div className="space-y-2">
          <p className="font-bold">Copied to clipboard.</p>
          <p className="line-clamp-2">{data}</p>
        </div>,
      );
    } catch {
      toast.error(
        <div className="space-y-2">
          <p className="font-bold">{ACTION_MESSAGES().WENT_WRONG}</p>
          <p className="line-clamp-2">Failed to copy to clipboard</p>
        </div>,
      );
    }
  };

  return (
    <>
      <Button
        variant={"info"}
        onClick={copyAndToast}
        className="flex size-7 p-1 min-w-7"
        effect={BUTTON_EFFECT}
        {...props}
      >
        <FaRegCopy />
      </Button>
    </>
  );
};
