import { DEBOUNCE_DEFAULT } from "@/constants/misc";
import { useSearchParams } from "@/hooks/use-search-params";
import { TransitionStartFunction, useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDebounceCallback } from "usehooks-ts";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  startTransition: TransitionStartFunction;
}

export const SearchField = ({ startTransition }: Props) => {
  const [{ search }, setSearchParams] = useSearchParams(startTransition);

  const searchElRef = useRef<HTMLInputElement>(null);

  const debounced = useDebounceCallback((search: string) => {
    setSearchParams({
      search: search || null,
      pageIndex: 0,
    });
  }, DEBOUNCE_DEFAULT);

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Search by title"
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
            debounced("");
            el.value = "";
            el.focus();
          }}
        >
          <IoIosCloseCircleOutline />
        </Button>
      )}
    </div>
  );
};
