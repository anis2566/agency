import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "./auth";

const protectedRoutes = ["/dashboard", "/payment"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");
  const isPaymentRoute = request.nextUrl.pathname.startsWith("/payment");

  if (!session && isProtected) {
    const signInUrl = new URL("/auth/sign-in", request.nextUrl);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

    if (request.nextUrl.pathname !== "/auth/sign-in") {
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
