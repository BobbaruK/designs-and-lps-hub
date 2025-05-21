"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [compIsLoaded, setCompIsLoaded] = useState(false);

  const chartData = languages.map((language) => ({
    language: capitalizeFirstLetter(language.slug),
    landingPages: language._count.landingPages,
  }));

  useEffect(() => {
    setCompIsLoaded(true);
    return () => {};
  }, [compIsLoaded]);

  return (
    <Card
      {...restProps}
      className={cn(`flex flex-col @container/langs`, restProps.className)}
    >
      <CardHeader>
        <CardTitle>
          Popular {languagesMeta.label.plural.toLowerCase()}
        </CardTitle>
      </CardHeader>
      <CardContent className="my-auto h-full">
        {compIsLoaded && (
          <>
            <ChartContainer
              config={chartConfig}
              className="hidden h-full max-h-[290px] w-full @lg:block"
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
                    router.push(
                      `${languagesMeta.href}/${language.toLowerCase()}`,
                    )
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

            <ChartContainer
              config={chartConfig}
              className="block @lg:hidden sm:!aspect-auto sm:h-full"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="language"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis dataKey="landingPages" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="landingPages"
                  layout="vertical"
                  fill="var(--color-landingPages)"
                  radius={4}
                  onClick={({ language }: { language: string }) =>
                    router.push(
                      `${languagesMeta.href}/${language.toLowerCase()}`,
                    )
                  }
                >
                  <LabelList
                    dataKey="language"
                    position="insideLeft"
                    offset={8}
                    className="fill-background"
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="landingPages"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <Link href={"/languages"}>See all {languagesMeta.label.plural}</Link>
        </div>
      </CardFooter>
    </Card>
  );
}
