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
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { Prisma, UserRole } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteLandingPage } from "../../actions/delete-landing-page";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";

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
      registrationType: true;
      language: true;
      license: true;
      landingPageType: true;
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

      <DropdownMenu>
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
                onClick={() => {
                  setIsDialogOpen(true);
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
