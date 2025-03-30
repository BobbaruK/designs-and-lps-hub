import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  imageUrl: string | null;
  size?: "sm" | "md" | "lg";
}

export const SvgMask = ({ imageUrl, size = "sm", ...restProps }: Props) => {
  if (!imageUrl) return null;

  const classList = (): string => {
    if (size === "sm") {
      return "h-[30px] w-[70px]";
    }

    if (size === "md") {
      return "h-[40px] w-[120px]";
    }

    if (size === "lg") {
      return "h-[50px] w-[150px]";
    }

    return "";
  };

  return (
    <span
      {...restProps}
      className={cn(
        `block w-fit rounded-md border-[1px] border-primary p-1 ${restProps.className}`,
      )}
    >
      <span
        className={cn(
          `mask mask-image block h-[50px] w-[150px] bg-foreground ${classList()}`,
        )}
        style={{
          maskImage: `url(${imageUrl})`,
          WebkitMaskImage: `url(${imageUrl})`,
          maskSize: "contain",
          maskPosition: "center",
          maskRepeat: "no-repeat",
        }}
      />
    </span>
  );
};
