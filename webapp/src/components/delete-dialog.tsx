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
import { useMediaQuery } from "usehooks-ts";
import { CustomButton } from "./custom-button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

interface Props {
  label: string;
  asset: string;
  onDelete: () => void;
  open?: boolean;
  onOpenChange?(open: boolean): void;
  showTrigger?: boolean;
  hideLabelOnMobile?: boolean;
  disabled?: boolean;
}

export const DeleteDialog = ({
  asset,
  label,
  onDelete,
  open,
  onOpenChange,
  showTrigger = true,
  hideLabelOnMobile = true,
  disabled = false,
}: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
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
              disabled={disabled}
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
          <DialogFooter className="gap-2 sm:justify-start">
            <DialogClose asChild>
              <CustomButton
                buttonLabel={`Cancel`}
                variant={"secondary"}
                disabled={disabled}
              />
            </DialogClose>
            <DialogClose asChild>
              <CustomButton
                buttonLabel={`Delete ${asset}`}
                variant={"destructive"}
                icon={MdDeleteOutline}
                iconPlacement="left"
                onClick={onDelete}
                hideLabelOnMobile={false}
                disabled={disabled}
              />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <DrawerTrigger asChild>
          <CustomButton
            buttonLabel={`Delete ${asset}`}
            variant={"destructive"}
            icon={MdDeleteOutline}
            iconPlacement="left"
            hideLabelOnMobile={hideLabelOnMobile}
            disabled={disabled}
          />
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This will permanently delete {asset} <strong>{label}</strong> and
            remove all data from the servers. This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col pt-2 sm:flex-row">
          <DrawerClose asChild>
            <CustomButton
              buttonLabel={`Cancel`}
              variant={"secondary"}
              disabled={disabled}
            />
          </DrawerClose>
          <DrawerClose asChild>
            <CustomButton
              buttonLabel={`Delete ${asset}`}
              variant={"destructive"}
              icon={MdDeleteOutline}
              iconPlacement="left"
              onClick={onDelete}
              hideLabelOnMobile={false}
              disabled={disabled}
            />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
