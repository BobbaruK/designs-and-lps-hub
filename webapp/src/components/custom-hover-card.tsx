import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ReactNode } from "react";

interface Props {
  trigger: ReactNode;
  triggerAsChild?: boolean;
  children: ReactNode;
  align?: "center" | "end" | "start";
}

export const CustomHoverCard = ({
  children,
  trigger,
  triggerAsChild = false,
  align,
}: Props) => {
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger
        className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer"
        asChild={triggerAsChild}
      >
        {trigger}
      </HoverCardTrigger>
      <HoverCardContent
        className="w-auto max-w-[300px] overflow-hidden leading-relaxed"
        align={align || "start"}
        
      >
        {children}
      </HoverCardContent>
    </HoverCard>
  );
};
