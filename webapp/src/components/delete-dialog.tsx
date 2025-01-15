"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdDeleteOutline } from "react-icons/md";
import { CustomButton } from "./custom-button";

interface Props {
  label: string;
  asset: string;
  onDelete: () => void;
  open?: boolean;
  onOpenChange?(open: boolean): void;
  showTrigger?: boolean;
  hideLabelOnMobile?: boolean;
}

export const DeleteDialog = ({
  asset,
  label,
  onDelete,
  open,
  onOpenChange,
  showTrigger = true,
  hideLabelOnMobile = true,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <CustomButton
            buttonLabel={`Delete ${asset}`}
            variant={"destructive"}
            icon={MdDeleteOutline}
            iconPlacement="left"
            hideLabelOnMobile={hideLabelOnMobile}
          />
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete {asset} <strong>{label}</strong> and
            remove all data from the servers. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start gap-2">
          <DialogClose asChild>
            <CustomButton buttonLabel={`Cancel`} variant={"secondary"} />
          </DialogClose>
          <DialogClose asChild>
            <CustomButton
              buttonLabel={`Delete ${asset}`}
              variant={"destructive"}
              icon={MdDeleteOutline}
              iconPlacement="left"
              onClick={onDelete}
              hideLabelOnMobile={false}
            />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
