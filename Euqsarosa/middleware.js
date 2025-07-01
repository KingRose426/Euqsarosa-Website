import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();
  const themeCookie = request.cookies.get("theme");
  const prefersDark =
    request.headers.get("sec-ch-prefers-color-scheme") === "dark";

  // If no theme cookie, set it based on system preference
  if (!themeCookie) {
    response.cookies.set("theme", prefersDark ? "dark" : "light", {
      path: "/",
    });
  }
  return response;
}

export const config = {
  matcher: [
    // Match all request paths except for:
    // - static files
    // - API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
