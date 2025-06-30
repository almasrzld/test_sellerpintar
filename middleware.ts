import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLogged = request.cookies.get("access_token");
  const role = request.cookies.get("access_role");

  if (
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname.startsWith("/dashboard")) &&
    !isLogged
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    isLogged &&
    role?.value === "User"
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (request.nextUrl.pathname === "/" && isLogged && role?.value === "Admin") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (request.nextUrl.pathname === "/auth/login" && isLogged) {
    const redirectUrl = role?.value === "User" ? "/" : "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, request.nextUrl));
  }

  return NextResponse.next();
}
