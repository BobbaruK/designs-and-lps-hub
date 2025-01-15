"use server";

import { signOut } from "@/auth";

// Centralize messages
const MESSAGES = {
  LOGGED_OUT_SUCCESS: "You have been signed out successfully!",
  LOGGED_OUT_ERROR: "Something went wrong!",
};

/**
 * **{@linkcode logout} server function**
 *
 * A signout function. {@linkcode signOut}
 */
export const logout = async () => {
  try {
    await signOut({
      redirectTo: "/auth/login",
      redirect: false,
    });

    return {
      success: MESSAGES.LOGGED_OUT_SUCCESS,
    };
  } catch (error) {
    console.error(MESSAGES.LOGGED_OUT_ERROR, error);

    return {
      error: MESSAGES.LOGGED_OUT_ERROR,
    };
  }
};
