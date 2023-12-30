import { SignJWT } from "jose";

export default async function generateJWTToken(payload, isLogout = false) {
  try {
    if (isLogout) {
      const logoutToken = await sign(payload, process.env.JWT_LOGOUT_SECRET, 1);

      return logoutToken;
    }

    const token = await sign(
      payload,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRY,
    );

    return token;
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

async function sign(payload, secret, expiryTime) {
  try {
    const initializedAt = Math.floor(Date.now() / 1000);
    const expiry = initializedAt + Number(expiryTime);

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expiry)
      .setIssuedAt(initializedAt)
      .setNotBefore(initializedAt)
      .sign(new TextEncoder().encode(secret));

    return token;
  } catch (error) {
    // console.log(error);
    throw error;
  }
}
