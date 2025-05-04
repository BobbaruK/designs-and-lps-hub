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
import { brandsMeta } from "@/constants/page-titles/brands";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { dl_brand, UserRole } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteBrand } from "../../actions/delete-brand";

interface Props {
  brand: dl_brand;
}

const BrandRowActions = ({ brand }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userRole = useCurrentRole();

  const onDelete = () => {
    // TODO: use transition here and other similar places
    deleteBrand(brand.id)
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
        label={brand.name}
        asset={brandsMeta.label.singular.toLowerCase()}
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
                <Link href={`${brandsMeta.href}/${brand.slug}/edit`}>
                  <span>
                    Edit {brandsMeta.label.singular.toLowerCase()}{" "}
                    <strong>{brand.name}</strong>
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
                  Delete {brandsMeta.label.singular.toLowerCase()}{" "}
                  <strong>{brand.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(brand.id);

              toast.info(`Copied ${brand.name}'s ID`, {
                description: brand.id,
              });
            }}
          >
            <span>
              Copy <strong>{brand.name}</strong>&apos;s ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BrandRowActions;
