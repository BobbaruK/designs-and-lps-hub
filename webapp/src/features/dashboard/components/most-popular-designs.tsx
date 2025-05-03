import { CustomAvatar } from "@/components/custom-avatar";
import { NumberBadge } from "@/components/number-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { designsMeta } from "@/constants/page-titles/designs";
import { cn } from "@/lib/utils";
import { DB_Design } from "@/types/db/design";
import Link from "next/link";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  designs: DB_Design[] | null;
}

export const MostPopularDesigns = ({ designs, ...restProps }: Props) => {
  return (
    <Card {...restProps}>
      <CardHeader>
        <CardTitle>
          Most popular {designsMeta.label.plural.toLowerCase()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!designs?.length ? (
          <p>No results</p>
        ) : (
          <div className="flex flex-wrap items-center justify-around gap-4">
            {designs.map((design, index) => (
              <DesignCard key={design.id} design={design} index={index} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function DesignCard({ design, index }: { design: DB_Design; index: number }) {
  const border = () => {
    const base = `border-[10px] hover:shadow-2xl`;

    switch (index) {
      case 0:
        return `${base} border-yellow-400 hover:shadow-yellow-400/50`;

      case 1:
        return `${base} border-slate-400 hover:shadow-slate-400/50`;

      case 2:
        return `${base} border-orange-600 hover:shadow-orange-600/50`;

      default:
        return `${base} border-red-500 hover:shadow-red-500/50`;
    }
  };

  return (
    <div key={design.id} className="flex flex-col gap-2 text-center">
      <div className={cn("relative overflow-clip rounded-md", border())}>
        <Link href={`${designsMeta.href}/${design.slug}`}>
          <CustomAvatar
            image={design.avatar}
            className="h-44 w-full max-w-full overflow-hidden rounded-none sm:aspect-video"
            position="top"
          />
        </Link>
      </div>
      <div>
        <Link
          href={`${designsMeta.href}/${design.slug}`}
          className="flex items-center justify-center gap-2"
        >
          <span>{design.name}</span>
          <NumberBadge number={design._count.landingPages} />
        </Link>
      </div>
    </div>
  );
}
