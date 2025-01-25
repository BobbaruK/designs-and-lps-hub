"use client";
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
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { languagesMeta } from "@/constants/page-titles/languages";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

export const LanguagesWithMostLPs = ({ languages, ...restProps }: Props) => {
  const partConfig: {
    [key: string]: {
      label: string;
      color: string;
    };
  } = {};

  for (let i = 0; i < languages.length; i++) {
    const element = languages[i].englishName.toLowerCase().replaceAll(" ", "");
    partConfig[element] = {
      label: languages[i].englishName,
      color: `hsl(var(--chart-${i + 1}))`,
    };
  }

  const chartConfig = {
    lps: {
      label: "LPs",
    },
    ...partConfig,
  } satisfies ChartConfig;

  const chartData = languages.map((language) => ({
    language: language.englishName.toLowerCase().replaceAll(" ", ""),
    lps: language._count.landingPages,
    fill: `var(--color-${language.englishName.toLowerCase().replaceAll(" ", "")})`,
  }));

  return (
    <Card {...restProps}>
      <CardHeader>
        <CardTitle>
          {languagesMeta.label.plural} with most {landingPagesMeta.label.plural}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="language"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={90}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="lps" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="lps" layout="vertical" radius={5} />
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
};
