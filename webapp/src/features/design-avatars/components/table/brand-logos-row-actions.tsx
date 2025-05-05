import { revalidate } from "@/actions/reavalidate";
import { ToastBody } from "@/components/copy-to-clipboard/toast-body";
import { DeleteDialog } from "@/components/delete-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ACTION_MESSAGES } from "@/constants/messages";
import { designAvatarsMeta } from "@/constants/page-titles/design-avatars";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { useCustomCopy } from "@/hooks/use-custom-copy";
import { dl_avatar_brand_logo, UserRole } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteDesignAvatar } from "../../actions/delete-design-avatar";

interface Props {
  brandLogo: dl_avatar_brand_logo;
}

const DesignAvatarRowActions = ({ brandLogo }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userRole = useCurrentRole();
  const { handleCopy } = useCustomCopy();

  const onDelete = () => {
    // TODO: use transition here and other similar places
    deleteDesignAvatar(brandLogo.id)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
        revalidate();
      })
      .catch(() => toast.success(ACTION_MESSAGES().WENT_WRONG));
  };

  return (
    <>
      <DeleteDialog
        label={brandLogo.name}
        asset={designAvatarsMeta.label.singular.toLowerCase()}
        onDelete={onDelete}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        showTrigger={false}
      />

      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {userRole !== UserRole.USER && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/design-avatars/${brandLogo.id}`}>
                  <span>
                    Edit design avatar <strong>{brandLogo?.name}</strong>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(evt) => {
                  evt.preventDefault();

                  setIsDialogOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                <span>
                  Delete design avatar <strong>{brandLogo?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleCopy({
              text: brandLogo.id,
              toastError: <ToastBody type={"error"} />,
              toastSuccess: (
                <ToastBody type={"success"} copiedData={brandLogo.id} />
              ),
            })}
          >
            <span>
              Copy <strong>{brandLogo.name}</strong>&apos;s ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DesignAvatarRowActions;
