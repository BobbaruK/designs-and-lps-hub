"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
              avatar: true;
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
      <CardHeader className="items-center pb-0">
        <CardTitle>{landingPagesMeta.label.plural} added and edited</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {user._count.landingPageCreated && user._count.landingPageUpdated ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="length"
                nameKey="lps"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <p className="pt-6 text-center">
            No {landingPagesMeta.label.plural} created or edited
          </p>
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
