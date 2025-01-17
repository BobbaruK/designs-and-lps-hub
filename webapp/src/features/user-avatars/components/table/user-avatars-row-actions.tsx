import { revalidate } from "@/actions/reavalidate";
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
import { ACTION_MESSAGES } from "@/constants";
import { useCurrentRole } from "@/features/auth/hooks";
import { dl_avatar_user } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteUserAvatar } from "../../actions/delete-user-avatar";

interface Props {
  userAvatar: dl_avatar_user;
}

const UserAvatarsRowActions = ({ userAvatar }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userRole = useCurrentRole();

  const onDelete = () => {
    deleteUserAvatar(userAvatar.id)
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
        label={userAvatar.name}
        asset={"user"}
        onDelete={onDelete}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        showTrigger={false}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {userRole !== "USER" && (
            <>
              <DropdownMenuItem asChild>
                <Link href={`/user-avatars/${userAvatar.id}`}>
                  <span>
                    Edit user avatar <strong>{userAvatar?.name}</strong>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <span>
                  Delete user avatar <strong>{userAvatar?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(userAvatar.id);

              toast.info(`Copied ${userAvatar.name}'s ID`, {
                description: userAvatar.id,
              });
            }}
          >
            <span>
              Copy <strong>{userAvatar.name}</strong>&apos;s ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAvatarsRowActions;
