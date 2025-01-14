"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useSidebar } from "./ui/sidebar";

interface Props {
  children: ReactNode;
}

export const MainWrapper = ({ children }: Props) => {
  const { isMobile, state } = useSidebar();

  return (
    <main
      className={cn("w-full transition-[width] duration-200", {
        "w-full": isMobile,
        "w-[calc(100%-var(--sidebar-width))]":
          !isMobile && state === "expanded",
        "w-[calc(100%-var(--sidebar-width-icon)-1rem)]":
          !isMobile && state === "collapsed",
      })}
    >
      {children}
    </main>
  );
};
