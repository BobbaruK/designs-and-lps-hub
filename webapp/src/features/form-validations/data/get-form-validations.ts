import db from "@/lib/db";

/**
 * {@linkcode getFormValidations}
 *
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getFormValidations = async () => {
  try {
    const formValidations = await db.dl_form_validation.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        createdBy: true,
        updatedBy: true,
        _count: {
          select: {
            landingPages: true,
          },
        },
      },
    });

    return formValidations;
  } catch {
    return null;
  }
};
