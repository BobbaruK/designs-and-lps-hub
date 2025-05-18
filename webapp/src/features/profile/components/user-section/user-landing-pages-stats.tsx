"use client";

import { LabelList, Pie, PieChart } from "recharts";

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
import { Prisma } from "@prisma/client";

const chartConfig = {
  created: {
    label: "LPs created",
    color: "hsl(var(--chart-1))",
  },
  updated: {
    label: "LPs updated",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  user: Prisma.UserGetPayload<{
    omit: {
      password: true;
    };

    include: {
      _count: {
        select: {
          landingPageCreated: true;
          landingPageUpdated: true;
        };
      };
      landingPagesRequested: {
        orderBy: {
          createdAt: "desc";
        };
        select: {
          id: true;
          name: true;
          slug: true;
          license: {
            select: {
              id: true;
              name: true;
              slug: true;
            };
          };
          language: {
            select: {
              id: true;
              englishName: true;
              iso_639_1: true;
              flag: true;
            };
          };
          design: {
            select: {
              avatars: true;
            };
          };
        };
        take: 5;
      };
    };
  }>;
  landingPageCount: number;
}

export function UserLandingPagesStats({ user, landingPageCount }: Props) {
  const chartData = [
    {
      lps: "created",
      length: user._count.landingPageCreated,
      fill: "var(--color-created)",
    },
    {
      lps: "updated",
      length: user._count.landingPageUpdated,
      fill: "var(--color-updated)",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center">
        <CardTitle>{landingPagesMeta.label.plural} added and updated</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {user._count.landingPageCreated && user._count.landingPageUpdated ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] px-0"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="length" hideLabel />}
              />
              <Pie data={chartData} dataKey="length" nameKey="lps">
                <LabelList
                  dataKey="lps"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <>
            {user._count.landingPageCreated > 0 && (
              <p className="pt-6 text-center">
                {landingPagesMeta.label.plural} created:{" "}
                {user._count.landingPageCreated}
              </p>
            )}
            {user._count.landingPageUpdated > 0 && (
              <p className="text-center">
                {landingPagesMeta.label.plural} created:{" "}
                {user._count.landingPageUpdated}
              </p>
            )}
            {user._count.landingPageCreated === 0 &&
              user._count.landingPageUpdated === 0 && (
                <p className="text-center">
                  No {landingPagesMeta.label.plural} created or updated
                </p>
              )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total {landingPagesMeta.label.plural}: {landingPageCount}
        </div>
      </CardFooter>
    </Card>
  );
}
