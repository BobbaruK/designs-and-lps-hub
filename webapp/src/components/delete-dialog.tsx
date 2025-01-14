import { Button } from "@/components/ui/button";
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
          <Button variant={"destructive"}>Delete {asset}</Button>
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
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={"destructive"} onClick={onDelete}>
              Delete {asset}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
