export const ACTION_MESSAGES = (resource?: string) => {
  return {
    SUCCESS_ADD: resource
      ? `${resource} successfully added!`
      : "Successfully added!",
    SUCCESS_UPDATE: resource
      ? `${resource} successfully updated!`
      : "Successfully updated!",
    SUCCESS_DELETE: resource
      ? `${resource} successfully deleted!`
      : "Successfully deleted!",
    COULD_NOT_ADD: resource
      ? `${resource} could not be added!`
      : "Could not be added!",
    COULD_NOT_UPDATE: resource
      ? `${resource} could not be updated!`
      : "Could not be updated!",
    COULD_NOT_DELETE: resource
      ? `${resource} could not be deleted!`
      : "Could not be deleted!",
    WENT_WRONG: "Something went wrong!",
    EMAIL_IN_USE: "Email already in use",
    UNAUTHORIZED: "Unauthorized!",
    INVALID_FIELDS: "Invalid fields!",
    DOES_NOT_EXISTS: resource
      ? `${resource} does not exists!`
      : "Does not exists!",
    VERIFICATION_SENT: "Verification email sent!",
    NOT_OLD_PASS: "User's new password cannot be old password!",
    CUSTOM_ALERT: resource
      ? `Something went wrong. ${resource} does not return any data!`
      : "Does not return any data!",
  };
};

export const PRISMA_MESSAGES = (resource?: string) => {
  return {
    P2002: resource
      ? `Already exists a resource with this ${resource.toLowerCase()}!`
      : "Duplicate!",
  };
};
