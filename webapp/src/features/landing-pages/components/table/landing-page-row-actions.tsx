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
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { deleteLandingPage } from "@/features/landing-pages/actions/delete-landing-page";
import { useCustomCopy } from "@/hooks/use-custom-copy";
import { DB_LandingPage } from "@/types/db/landing-pages";
import { UserRole } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  landingPage: DB_LandingPage;
}

const LandingPageRowActions = ({ landingPage }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userRole = useCurrentRole();
  const { handleCopy } = useCustomCopy();

  const onDelete = () => {
    deleteLandingPage(landingPage.id).then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
      revalidate();
    });
  };

  return (
    <>
      <DeleteDialog
        label={landingPage?.name}
        asset={landingPagesMeta.label.singular.toLowerCase()}
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
                  href={`${landingPagesMeta.href}/${landingPage.slug}/edit`}
                >
                  <span>
                    Edit {landingPagesMeta.label.singular.toLowerCase()}{" "}
                    <strong>{landingPage?.name}</strong>
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
                  Delete {landingPagesMeta.label.singular.toLowerCase()}{" "}
                  <strong>{landingPage?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleCopy({
              text: landingPage.id,
              toastError: <ToastBody type={"error"} />,
              toastSuccess: (
                <ToastBody type={"success"} copiedData={landingPage.id} />
              ),
            })}
          >
            <span>
              Copy <strong>{landingPage.name}</strong> ID
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleCopy({
              text: landingPage.url,
              toastError: <ToastBody type={"error"} />,
              toastSuccess: (
                <ToastBody type={"success"} copiedData={landingPage.url} />
              ),
            })}
          >
            <span>
              Copy <strong>{landingPage.name}</strong> url address
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={landingPage.url} target="_blank">
              <span>
                Go to <strong>{landingPage.name}</strong>&apos;s url address
              </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LandingPageRowActions;
