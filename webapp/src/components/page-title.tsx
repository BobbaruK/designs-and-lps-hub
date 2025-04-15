"use client";

import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { CustomButton } from "./custom-button";

interface Props {
  label: string;
  addBtnHref?: string;
  editBtnHref?: string;
  backBtnHref?: string;
}

export const PageTitle = ({
  label,
  addBtnHref,
  editBtnHref,
  backBtnHref,
}: Props) => {
  const role = useCurrentRole();
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-secondary pb-2">
      <h1 className="text-heading1">{label}</h1>

      <div className="flex flex-wrap items-center justify-end gap-4">
        {addBtnHref && role !== UserRole.USER && (
          <CustomButton
            buttonLabel="Add"
            variant={"outline"}
            icon={IoAddCircleOutline}
            iconPlacement="left"
            linkHref={addBtnHref}
          />
        )}
        {editBtnHref && role !== UserRole.USER && (
          <CustomButton
            buttonLabel="Edit"
            variant={"outline"}
            icon={MdModeEdit}
            iconPlacement="left"
            linkHref={editBtnHref}
          />
        )}
        {backBtnHref && (
          <CustomButton
            buttonLabel="Back"
            variant={"outline"}
            icon={IoMdArrowRoundBack}
            iconPlacement="left"
            linkHref={backBtnHref}
          />
        )}
      </div>
    </div>
  );
};
