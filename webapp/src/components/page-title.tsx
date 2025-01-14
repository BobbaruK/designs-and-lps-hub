"use client";

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

export const PageTtle = ({
  label,
  addBtnHref,
  editBtnHref,
  backBtnHref,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-secondary pb-2">
      <h1 className="text-heading4">{label}</h1>

      <div className="flex flex-wrap items-center justify-end gap-4">
        {addBtnHref && (
          <CustomButton
            buttonLabel="Add"
            variant={"outline"}
            icon={IoAddCircleOutline}
            iconPlacement="left"
            linkHref={addBtnHref}
          />
        )}
        {editBtnHref && (
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
