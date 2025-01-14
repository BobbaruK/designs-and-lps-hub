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
}

export const DeleteDialog = ({
  asset,
  label,
  onDelete,
  open,
  onOpenChange,
  showTrigger = true,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <CustomButton
            buttonLabel={`Delete ${asset}`}
            variant={"outline"}
            icon={MdDeleteOutline}
            iconPlacement="left"
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
        <DialogFooter className="sm:justify-start">
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
            />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
