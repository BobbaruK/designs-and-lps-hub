import { DEBOUNCE_DEFAULT } from "@/constants/misc";
import { useSearchParams } from "@/hooks/use-search-params";
import { TransitionStartFunction, useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDebounceCallback } from "usehooks-ts";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface Props {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  showSearchSwitch: boolean;
}

export const SearchField = ({
  isLoading,
  startTransition,
  showSearchSwitch,
}: Props) => {
  const [{ search, searchBy }, setSearchParams] =
    useSearchParams(startTransition);

  const searchElRef = useRef<HTMLInputElement>(null);

  const debounced = useDebounceCallback((search: string | null) => {
    setSearchParams({
      search: search || null,
      pageIndex: 0,
    });
  }, DEBOUNCE_DEFAULT);

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder={`Search by ${searchBy === "name" ? "title" : "URL"}`}
        onChange={(e) => {
          debounced(e.target.value);
        }}
        defaultValue={search || ""}
        ref={searchElRef}
        className="max-w-sm"
      />
      {search && (
        <Button
          className="[&_svg]:size-5"
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            const el = searchElRef.current as HTMLInputElement;
            debounced(null);
            el.value = "";
            el.focus();
          }}
        >
          <IoIosCloseCircleOutline />
        </Button>
      )}
      {showSearchSwitch && (
        <SwitchSearch isLoading={isLoading} startTransition={startTransition} />
      )}
    </div>
  );
};

function SwitchSearch({
  isLoading,
  startTransition,
}: {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}) {
  const [{ searchBy }, setSearchParams] = useSearchParams(startTransition);

  return (
    <div className="flex items-center gap-2">
      <Switch
        className=""
        checked={
          searchBy === "name" ? false : searchBy === "url" ? true : false
        }
        onCheckedChange={() =>
          setSearchParams({
            searchBy:
              searchBy === "name"
                ? "url"
                : searchBy === "url"
                  ? "name"
                  : "name",
            pageIndex: 0,
          })
        }
        disabled={isLoading}
        id="search-switch"
      />
      <Label htmlFor="search-switch">URL</Label>
    </div>
  );
}
