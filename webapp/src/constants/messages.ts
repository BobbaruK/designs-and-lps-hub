export const ACTION_MESSAGES = (resource?: string) => {
  return {
    COULD_NOT_ADD: resource
      ? `${resource} could not be added!`
      : "Could not be added!",
    SUCCESS_ADD: resource
      ? `${resource} sucessfuly added2!`
      : "Sucessfuly added!",
    WENT_WRONG: "Something went wrong!",
    EMAIL_IN_USE: "Email already in use",
  };
};

export const PRISMA_MESSAGES = (resource?: string) => {
  return {
    P2002: resource ? `Duplicate ${resource.toLowerCase()}!` : "Duplicate!",
  };
};
