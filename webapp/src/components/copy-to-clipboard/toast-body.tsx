"use client";
import { ACTION_MESSAGES } from "@/constants/messages";

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
