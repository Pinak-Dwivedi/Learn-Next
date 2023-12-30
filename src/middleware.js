// import { checkIfAuthenticated } from "./middlewares/authentication";
import { getUserInfo } from "./utils/apiCalls/users";

const authorizedPaths = ["/admin/dashboard"];
const authenticatedPaths = ["/posts", "/posts/me", "/myprofile"];
const nonAuthenticatedPaths = ["/login", "/forgot-password"];

export default async function middleware(req, { params }) {
  try {
    const { isAuth, isAdmin } = await checkAuth(req);

    // non authenticated paths
    if (
      isAuth &&
      (nonAuthenticatedPaths.includes(req.nextUrl.pathname) ||
        RegExp("^/reset-password/.+$", "i").test(req.nextUrl.pathname))
    ) {
      throw new Error("Not allowed!");
    }

    // authenticated check
    if (
      !isAuth &&
      (authenticatedPaths.includes(req.nextUrl.pathname) ||
        /^\/posts\/?.*$/i.test(req.nextUrl.pathname))
    ) {
      throw new Error("Not authenticated!");
    }

    // authroized check
    if (
      !isAdmin &&
      (authorizedPaths.includes(req.nextUrl.pathname) ||
        /^\/admin\/user\/.*$/.test(req.nextUrl.pathname))
    ) {
      throw new Error("Not authorized!");
    }
  } catch (error) {
    // console.log(error);
    return Response.redirect(new URL("/", req.url));
  }
}

// destructring doesn't work in matcher array

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/posts/:path*",
    "/myprofile",
    "/forgot-password",
    "/reset-password/:path*",
  ],
};

async function checkAuth(req) {
  // api requests made from middleware(server side) do not send cookies by default hence api will always show not authenticated and also middleware cannot set request headers for api requests. That's why I am explicitly sending cookies with req.cookies

  try {
    // const userId = await checkIfAuthenticated(req);

    const data = await getUserInfo(req.cookies);

    if (data?.success) {
      if (data?.user?.role === "admin") return { isAuth: true, isAdmin: true };

      return { isAuth: true, isAdmin: false };
    }

    return { isAuth: false };
  } catch (error) {
    // returning from catch because I need the hold of result value
    return { isAuth: false };
  }
}
