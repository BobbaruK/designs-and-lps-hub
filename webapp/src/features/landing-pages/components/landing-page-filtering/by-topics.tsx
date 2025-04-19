import { topicsMeta } from "@/constants/page-titles/topics";
import { useSearchParams } from "@/hooks/use-search-params";
import { cn } from "@/lib/utils";
import { TopicMinimal } from "@/types/minimals";
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
  const [{ topic }, setSearchParams] = useSearchParams(startTransition);

  const handleCheckTopicChange = (topicMinimal: TopicMinimal) => {
    if (topic?.includes(topicMinimal.slug)) {
      const filtered = topic.filter((feat) => feat !== topicMinimal.slug);

      setSearchParams({ topic: filtered.length > 0 ? filtered : null });

      return;
    }

    setSearchParams((f) => ({
      topic: [...(f.topic || []), topicMinimal.slug],
    }));
  };

  return (
    <div
      {...restProps}
      className={cn(`flex flex-col gap-2 ${restProps.className}`)}
    >
      <FilterBody
        resources={topics}
        paramsArr={topic}
        isLoading={isLoading}
        title={topicsMeta}
        handleSetParams={handleCheckTopicChange}
        showResetBtn={topic && topic?.length ? false : true}
        handleReset={() => setSearchParams({ topic: null })}
      />
    </div>
  );
};
