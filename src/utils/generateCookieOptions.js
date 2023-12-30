export default function generateCookieOptions(isLogout = false) {
  if (isLogout) {
    const logoutCookieOptions = {
      maxAge: -1,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    };

    return logoutCookieOptions;
  }

  const cookieOptions = {
    maxAge: process.env.COOKIE_EXPIRY,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "development" ? false : true,
  };

  return cookieOptions;
}
