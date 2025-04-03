import { topicsMeta } from "@/constants/page-titles/topics";
import { cn } from "@/lib/utils";
import { TopicMinimal } from "@/types/minimals";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { TransitionStartFunction } from "react";
import { FilterBody } from "./filter-body";

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
      <FilterBody
        resources={topics}
        paramsArr={topicsQuery}
        isLoading={isLoading}
        title={topicsMeta}
        handleSetParams={handleCheckTopicChange}
        showResetBtn={topicsQuery && topicsQuery?.length ? false : true}
        handleReset={() => setTopicsQuery(null)}
      />
    </div>
  );
};
