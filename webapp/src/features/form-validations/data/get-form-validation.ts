import db from "@/lib/db";

/**
 * {@linkcode getFormValidationBySlug}
 *
 * @param {string} slug - search in the database by id
 * @yields a `Promise` that resolve in an user `Object`
 */
export const getFormValidationBySlug = async (slug: string) => {
  try {
    const formValidation = await db.dl_form_validation.findUnique({
      where: {
        slug,
      },
    });

    return formValidation;
  } catch {
    return null;
  }
};
