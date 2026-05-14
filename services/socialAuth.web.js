// Web-stub for social auth – Google/Apple native sign-in er ikke tilgjengelig på web.

export async function googleSignIn() {
  throw new Error('Google Sign In er ikke tilgjengelig på web.');
}

export async function isAppleSignInAvailable() {
  return false;
}

export async function appleSignIn() {
  throw new Error('Apple Sign In er ikke tilgjengelig på web.');
}
