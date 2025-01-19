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
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { Prisma } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  landingPage: Prisma.dl_landing_pageGetPayload<{
    include: {
      createdBy: {
        omit: {
          password: true;
        };
      };
      updatedBy: {
        omit: {
          password: true;
        };
      };
      brand: true;
      design: true;
      formValidation: true;
      language: true;
      license: true;
      lpType: true;
      requester: {
        omit: {
          password: true;
        };
      };
      topic: true;
    };
  }>;
}

const LandingPageRowActions = ({ landingPage }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userRole = useCurrentRole();

  const onDelete = () => {
    // deleteLandingPage(landingPage.id).then((data) => {
    //   if (data.error) {
    //     toast.error(
    //       <div className="">
    //         Could not delete landing page
    //         <code>{landingPage.name}</code>.
    //       </div>,
    //     );
    //   }
    //   if (data.success) {
    //     toast.success(
    //       <div>
    //         Landing page
    //         <code>{landingPage.name}</code>
    //         deleted!
    //       </div>,
    //     );
    //   }
    //   revalidate();
    // });
  };

  return (
    <>
      <DeleteDialog
        label={landingPage?.name}
        asset={"landing lage"}
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
                <Link href={`/landing-page/${landingPage.slug}/edit`}>
                  <span>
                    Edit landing page <strong>{landingPage?.name}</strong>
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setIsDialogOpen(true);
                }}
              >
                <span>
                  Delete landing page <strong>{landingPage?.name}</strong>
                </span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(landingPage.id);

              toast.info(`Copied ${landingPage.name}'s ID`, {
                description: landingPage.id,
              });
            }}
          >
            <span>
              Copy <strong>{landingPage.name}</strong> ID
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(landingPage.url);

              toast.info(`Copied ${landingPage.name}'s url`, {
                description: landingPage.url,
              });
            }}
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
