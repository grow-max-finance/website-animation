import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip proxy for static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // Skip files with extensions (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // Get the session token cookie (next-auth uses this cookie name)
  const sessionToken = request.cookies.get("authjs.session-token")?.value 
    || request.cookies.get("__Secure-authjs.session-token")?.value;

  // Check if the path is an admin route (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // If no session token, redirect to login
    if (!sessionToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user has session and tries to access login page, redirect to admin
  if (pathname === "/admin/login") {
    if (sessionToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
