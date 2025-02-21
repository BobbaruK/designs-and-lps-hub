import {
  SearchParamFeature,
  SearchParamFOperator,
  SearchParamTopic,
} from "@/types/landing-pages";
import { Prisma } from "@prisma/client";

export const filtering = (opts: {
  feature?: SearchParamFeature;
  foperator?: SearchParamFOperator;
  topic?: SearchParamTopic;
}): Prisma.dl_landing_pageWhereInput | undefined => {
  const feature = opts.feature;
  const foperator = opts.foperator;
  const topic = opts.topic;

  let output:
    | Prisma.dl_landing_pageWhereInput
    | Prisma.dl_landing_pageWhereInput[]
    | undefined = {};

  if (opts.feature && typeof feature === "string") {
    output = {
      ...output,
      features: {
        some: {
          slug: feature, // TODO: This is not indexed
        },
      },
    };
  }

  if (feature && Array.isArray(feature) && feature.length > 0) {
    const featuresArr: Prisma.dl_landing_pageWhereInput[] | undefined = [];

    for (const slug of feature) {
      featuresArr.push({
        features: {
          some: {
            slug, // TODO: This is not indexed
          },
        },
      });
    }

    switch (foperator) {
      case "AND":
        output = {
          ...output,
          AND: featuresArr,
        };
        break;

      case "OR":
        output = {
          ...output,
          OR: featuresArr,
        };
        break;

      default:
        output = {
          ...output,
          OR: featuresArr,
        };
        break;
    }
  }

  if (topic) {
    output = {
      ...output,
      topic: { slug: topic }, // TODO: This is not indexed
    };
  }

  return output;
};
