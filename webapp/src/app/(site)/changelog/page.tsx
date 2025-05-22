import { PageBreadcrumbs } from "@/components/page-breadcrumbs";
import { PageStructure } from "@/components/page-structure";
import { PageTitle } from "@/components/page-title";
import { changelogMeta } from "@/constants/page-titles/changelog";
import { breadCrumbsFn } from "@/lib/breadcrumbs";
import { dateFormatter } from "@/lib/format-date";
import { parseMD } from "@/lib/parse-md";
import { capitalizeFirstLetter } from "@/lib/utils";
import { IBreadcrumb } from "@/types/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BREADCRUMBS: IBreadcrumb[] = [
  {
    href: changelogMeta.href,
    label: capitalizeFirstLetter(changelogMeta.label.singular),
  },
];

const ChangeLogPage = async () => {
  const changelog = await parseMD("changelog.md");

  return (
    <PageStructure>
      <PageBreadcrumbs crumbs={breadCrumbsFn(BREADCRUMBS)} />
      <PageTitle label={changelogMeta.label.singular} />

      <div className="flex flex-col gap-4">
        {changelog.map((entry) => (
          <Card key={entry.version}>
            <CardHeader>
              <CardTitle>{entry.version}</CardTitle>
              <CardDescription>
                {dateFormatter({
                  date: entry.date,
                  options: {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  },
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Object.entries(entry.sections).map(([section, items]) => (
                <div key={section}>
                  <h3 className="font-medium">{section}</h3>
                  <ul className="list-inside list-disc">
                    {items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </PageStructure>
  );
};

export default ChangeLogPage;
