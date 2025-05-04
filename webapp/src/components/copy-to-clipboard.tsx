"use client";

import { ACTION_MESSAGES } from "@/constants/messages";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { CustomButton } from "./custom-button";
import { ButtonProps } from "./ui/button";

interface Props extends ButtonProps {
  data: string;
}

export const CopyToClipboard = ({ data, ...restProps }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.info(<ToastBody type={"success"} copiedData={data} />);
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
        toast.error(<ToastBody type={"error"} />);
      });
  };

  return (
    <CustomButton
      buttonLabel={`Copy to clipboard`}
      variant={"info"}
      size={"icon"}
      onClick={handleCopy(data)}
      icon={FaRegCopy}
      iconPlacement="right"
      {...restProps}
    />
  );
};

export function ToastBody({
  type,
  copiedData,
}: {
  type: "error" | "success";
  copiedData?: string;
}) {
  return (
    <div className="space-y-2">
      {type === "success" && (
        <>
          <p className="font-bold">Copied to clipboard.</p>
          <p className="line-clamp-2">{copiedData}</p>
        </>
      )}
      {type === "error" && (
        <>
          <p className="font-bold">{ACTION_MESSAGES().WENT_WRONG}</p>
          <p className="line-clamp-2">Failed to copy to clipboard</p>
        </>
      )}
    </div>
  );
}
