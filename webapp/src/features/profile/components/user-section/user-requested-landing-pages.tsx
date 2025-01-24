import { CustomAvatar } from "@/components/custom-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { landingPagesMeta } from "@/constants/page-titles/landing-pages";
import { Prisma } from "@prisma/client";
import Link from "next/link";

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
}

export const UserRequestedLandingPages = ({ user }: Props) => {
  const landingPagesLength = user.landingPagesRequested.length;
  const isMoreThanOne = landingPagesLength > 1;

  if (!landingPagesLength) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Last {isMoreThanOne && user.landingPagesRequested.length + " "}
          requested{" "}
          {isMoreThanOne
            ? landingPagesMeta.label.plural
            : landingPagesMeta.label.singular}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>License</TableHead>
              <TableHead>Language</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.landingPagesRequested.map((landingPage) => (
              <TableRow key={landingPage.id}>
                <TableCell>
                  <Link
                    href={`/landing-pages/${landingPage.slug}`}
                    className="flex items-center gap-2"
                  >
                    <CustomAvatar image={landingPage.design?.avatar} />
                    <span>{landingPage.name}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  {landingPage.license ? (
                    <Link
                      href={`/licenses/${landingPage.license.slug}`}
                      className="flex items-center gap-2"
                    >
                      {landingPage.license.name}
                    </Link>
                  ) : (
                    <p>No license</p>
                  )}
                </TableCell>
                <TableCell>
                  {landingPage.language ? (
                    <Link
                      href={`/languages/${landingPage.language.iso_639_1}`}
                      className="flex items-center gap-2"
                    >
                      {landingPage.language.englishName}
                    </Link>
                  ) : (
                    <p>No language</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
