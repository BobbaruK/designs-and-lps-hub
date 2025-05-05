"use client";

import { useCustomCopy } from "@/hooks/use-custom-copy";
import { FaRegCopy } from "react-icons/fa";
import { CustomButton } from "../custom-button";
import { ButtonProps } from "../ui/button";
import { ToastBody } from "./toast-body";

interface Props extends ButtonProps {
  data: string;
}

export const CopyToClipboard = ({ data, ...restProps }: Props) => {
  const { handleCopy } = useCustomCopy();

  return (
    <CustomButton
      buttonLabel={`Copy to clipboard`}
      variant={"info"}
      size={"icon"}
      onClick={handleCopy({
        text: data,
        toastError: <ToastBody type={"error"} />,
        toastSuccess: <ToastBody type={"success"} copiedData={data} />,
      })}
      icon={FaRegCopy}
      iconPlacement="right"
      {...restProps}
    />
  );
};
