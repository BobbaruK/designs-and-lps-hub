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
import { ACTION_MESSAGES } from "@/constants/messages";
import { useCurrentRole } from "@/features/auth/hooks";
import { dl_avatar_brand_logo } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteBrandLogo } from "../../actions/delete-brand-logo";

interface Props {
  brandLogo: dl_avatar_brand_logo;
}

const BrandLogosRowActions = ({ brandLogo }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userRole = useCurrentRole();

  const onDelete = () => {
    // TODO: use transition here and other similar places
    deleteBrandLogo(brandLogo.id)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
        revalidate();
      })
      .catch(() => toast.error(ACTION_MESSAGES().WENT_WRONG));
  };

  return (
    <>
      <DeleteDialog
        label={brandLogo.name}
        asset={"brand logo"}
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
                <Link href={`/brand-logos/${brandLogo.id}`}>
                  <span>
                    Edit brand logo <strong>{brandLogo?.name}</strong>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <span>
                  Delete brand logo <strong>{brandLogo?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(brandLogo.id);

              toast.info(`Copied ${brandLogo.name}'s ID`, {
                description: brandLogo.id,
              });
            }}
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

export default BrandLogosRowActions;
