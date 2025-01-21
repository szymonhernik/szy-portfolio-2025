import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/projects") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/projects",
};
