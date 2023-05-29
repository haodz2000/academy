export const isValidIdRedirectUrl = (redirectUrl?: string | null) => {
  if (!redirectUrl) return false;
  try {
    const url = new URL(redirectUrl);
    return url.origin === process.env.NEXT_PUBLIC_ID_CLIENT_BASE_URL;
  } catch (e) {
    return false;
  }
};
