import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// 1. Specify protected and public routes
const protectedRouteTree = "/home";
const publicRoutes = ["/auth/sign-in", "/auth/sign-up", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.includes(protectedRouteTree);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const token = cookies().get("authjs.session-token")?.value;

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl));
  }

  // 5. Redirect to /home if the user is authenticated and tries to access root
  if (isPublicRoute && token && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
