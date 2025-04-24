"use client";

import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { TransitionStartFunction } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { LuChevronsUpDown } from "react-icons/lu";
import { RxReset } from "react-icons/rx";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  id: string;
  label: string;
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

export const THeadDropdown = ({
  id,
  label,
  isLoading,
  startTransition,
}: Props) => {
  const [{ sort, sortBy }, setSearchParams] = useSearchParams(startTransition);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"link"}
          size={"sm"}
          className={cn(
            "flex items-center justify-start gap-2 p-0 text-inherit [&_svg]:size-3",
            sortBy === id ? "underline underline-offset-8" : "",
          )}
          disabled={isLoading}
        >
          {label}

          {!isLoading && (
            <>
              {sort === "asc" && sortBy === id && <FaChevronUp />}
              {sort === "desc" && sortBy === id && <FaChevronDown />}
              {(sort === null || sortBy !== id) && <LuChevronsUpDown />}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          className={cn("[&>svg]:size-3")}
          onClick={() =>
            setSearchParams({
              sortBy: id,
              sort: "asc",
              pageIndex: 0,
            })
          }
          disabled={sort === "asc" && sortBy === id}
        >
          <FaChevronUp /> Asc
        </DropdownMenuItem>
        <DropdownMenuItem
          className="[&>svg]:size-3"
          onClick={() =>
            setSearchParams({
              sortBy: id,
              sort: "desc",
              pageIndex: 0,
            })
          }
          disabled={sort === "desc" && sortBy === id}
        >
          <FaChevronDown /> Desc
        </DropdownMenuItem>
        {sort !== null && sortBy === id && (
          <DropdownMenuItem
            className="[&>svg]:size-3"
            onClick={() =>
              setSearchParams({
                sortBy: null,
                sort: null,
                pageIndex: 0,
              })
            }
          >
            <RxReset /> Reset
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
