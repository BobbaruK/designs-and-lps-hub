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
import { licensesMeta } from "@/constants/page-titles/licenses";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { useCustomCopy } from "@/hooks/use-custom-copy";
import { dl_license, UserRole } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteLicense } from "../../actions/delete-license";
import { ToastBody } from "@/components/copy-to-clipboard/toast-body";

interface Props {
  license: dl_license;
}

const LicenseRowActions = ({ license }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userRole = useCurrentRole();
  const { handleCopy } = useCustomCopy();

  const onDelete = () => {
    // TODO: use transition here and other similar places
    deleteLicense(license.id)
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
        label={license.name}
        asset={licensesMeta.label.singular.toLowerCase()}
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
                <Link href={`${licensesMeta.href}/${license.slug}/edit`}>
                  <span>
                    Edit {licensesMeta.label.singular.toLowerCase()}{" "}
                    <strong>{license?.name}</strong>
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
                  Delete {licensesMeta.label.singular.toLowerCase()}{" "}
                  <strong>{license?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleCopy({
              text: license.id,
              toastError: <ToastBody type={"error"} />,
              toastSuccess: (
                <ToastBody type={"success"} copiedData={license.id} />
              ),
            })}
          >
            <span>
              Copy <strong>{license.name}</strong>&apos;s ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LicenseRowActions;
