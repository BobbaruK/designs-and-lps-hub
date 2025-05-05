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
import { registrationTypesMeta } from "@/constants/page-titles/registration-types";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { useCustomCopy } from "@/hooks/use-custom-copy";
import { dl_registration_type, UserRole } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteRegistrationType } from "../../actions/delete-registration-type";

interface Props {
  registrationType: dl_registration_type;
}

const RegistrationTypeRowActions = ({ registrationType }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userRole = useCurrentRole();
  const { handleCopy } = useCustomCopy();

  const onDelete = () => {
    // TODO: use transition here and other similar places
    deleteRegistrationType(registrationType.id)
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
        label={registrationType.name}
        asset={registrationTypesMeta.label.singular.toLowerCase()}
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
                <Link
                  href={`${registrationTypesMeta.href}/${registrationType.slug}/edit`}
                >
                  <span>
                    Edit {registrationTypesMeta.label.singular.toLowerCase()}{" "}
                    <strong>{registrationType?.name}</strong>
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
                  Delete {registrationTypesMeta.label.singular.toLowerCase()}{" "}
                  <strong>{registrationType?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleCopy({
              text: registrationType.id,
              toastError: <ToastBody type={"error"} />,
              toastSuccess: (
                <ToastBody type={"success"} copiedData={registrationType.id} />
              ),
            })}
          >
            <span>
              Copy <strong>{registrationType.name}</strong>&apos;s ID
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default RegistrationTypeRowActions;
