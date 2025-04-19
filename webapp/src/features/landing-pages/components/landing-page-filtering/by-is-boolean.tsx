import { CustomButton } from "@/components/custom-button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RiResetLeftLine } from "react-icons/ri";

interface Props {
  boolean: boolean | null;
  isLoading: boolean;
  label: string;
  onReset: () => void;
  onChange: (e: boolean) => void;
}

export const ByIsBoolean = ({
  label,
  boolean,
  isLoading,
  onReset,
  onChange,
}: Props) => {
  return (
    <>
      <Label htmlFor={label.toLowerCase().replaceAll(" ", "-")}>{label}</Label>
      <div className="flex items-center gap-2">
        {boolean !== null && (
          <CustomButton
            buttonLabel={`Reset all filters`}
            variant={"outline"}
            size={"icon"}
            icon={RiResetLeftLine}
            iconPlacement="left"
            disabled={isLoading}
            onClick={onReset}
          />
        )}

        <Switch
          id={label.toLowerCase().replaceAll(" ", "-")}
          name={label.toLowerCase().replaceAll(" ", "-")}
          checked={boolean || false}
          onCheckedChange={onChange}
          disabled={isLoading}
        />
      </div>
    </>
  );
};
