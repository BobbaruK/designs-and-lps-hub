import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode } from "react";
import { FaTerminal } from "react-icons/fa6";

interface Props {
  title: string;

  icon?: ReactNode;
  variant?: "default" | "destructive";
}

type ConditionalProps =
  | {
      description?: string;
      asset?: never;
    }
  | { description?: never; asset?: string };

type ComponentProps = Props & ConditionalProps;

export const CustomAlert = ({
  description,
  title,
  icon,
  asset,
  variant = "default",
}: ComponentProps) => {
  return (
    <Alert variant={variant}>
      {icon || <FaTerminal />}
      <AlertTitle>{title}</AlertTitle>
      {/* <AlertDescription dangerouslySetInnerHTML={{ __html: description }} /> */}
      <AlertDescription>
        {description ||
          `Seems like the ${asset} that you are looking for does not exist.`}
      </AlertDescription>
    </Alert>
  );
};
