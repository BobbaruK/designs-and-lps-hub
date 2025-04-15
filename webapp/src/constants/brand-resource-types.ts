import { dl_brand_resource_type } from "@prisma/client";

export const brandResourceTypes = () => {
  const VALUES = [
    dl_brand_resource_type.VECTOR_IMAGE,
    dl_brand_resource_type.IMAGE,
    dl_brand_resource_type.DOCUMENT,
  ] as const;

  return VALUES;
};
