"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { languagesMeta } from "@/constants/page-titles/languages";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const chartConfig = {
  landingPages: {
    label: "LPs",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  languages: Prisma.dl_languageGetPayload<{
    include: {
      _count: {
        select: {
          landingPages: true;
        };
      };
    };
  }>[];
}

export function LanguagesWithMostLPs({ languages, ...restProps }: Props) {
  const router = useRouter();

  const chartData = languages.map((language) => ({
    language: capitalizeFirstLetter(language.slug),
    landingPages: language._count.landingPages,
  }));

  return (
    <Card {...restProps}>
      <CardHeader>
        <CardTitle>
          Popular {languagesMeta.label.plural.toLowerCase()}
        </CardTitle>
      </CardHeader>
      <CardContent className="my-auto">
        <ChartContainer
          config={chartConfig}
          className="h-full max-h-[290px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="language"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              onClick={({ value }: { value: string }) =>
                router.push(`${languagesMeta.href}/${value.toLowerCase()}`)
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="landingPages"
              fill="var(--color-landingPages)"
              radius={8}
              onClick={({ language }: { language: string }) =>
                router.push(`${languagesMeta.href}/${language.toLowerCase()}`)
              }
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <Link href={"/languages"}>See all {languagesMeta.label.plural}</Link>
        </div>
      </CardFooter>
    </Card>
  );
}
