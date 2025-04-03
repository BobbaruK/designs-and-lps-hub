import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { topicsMeta } from "@/constants/page-titles/topics";
import { cn } from "@/lib/utils";
import { TopicMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";
import { FilterHeader } from "./filter-header";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  topics?: TopicMinimal[] | null;
}

export const ByTopics = ({
  isLoading,
  startTransition,
  topics,
  ...restProps
}: Props) => {
  const [topicsQuery, setTopicsQuery] = useQueryState(
    "topic",
    parseAsArrayOf(parseAsString, ";").withOptions({
      shallow: false,
      startTransition,
    }),
  );

  const handleCheckTopicChange = (topic: TopicMinimal) => {
    if (topicsQuery?.includes(topic.slug)) {
      const filtered = topicsQuery.filter((feat) => feat !== topic.slug);

      setTopicsQuery(filtered.length > 0 ? filtered : null);

      return;
    }

    setTopicsQuery((f) => [...(f || []), topic.slug]);
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterHeader
        title={topicsMeta.label.plural}
        isLoading={isLoading}
        showResetBtn={topicsQuery && topicsQuery?.length ? true : false}
        handleReset={() => setTopicsQuery(null)}
      />

      <div className="flex flex-col gap-1">
        {topics?.map((topic) => {
          return (
            <div key={topic.id} className="flex items-center gap-2">
              <Checkbox
                id={topic.slug}
                checked={topicsQuery?.includes(topic.slug) || false}
                onCheckedChange={() => handleCheckTopicChange(topic)}
                disabled={isLoading}
              />

              <Label htmlFor={topic.slug}>{topic.name}</Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
