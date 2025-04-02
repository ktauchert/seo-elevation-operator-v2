import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

  if (!token) {
    // If no token, redirect to login page
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const expires = (token as { exp: number }).exp * 1000;
  const now = Date.now();

  if (expires < now) {
    // If token is expired, redirect to login page
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If token is valid, continue with the request
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/protected/:path*", "/elevation/:path*"], // Adjust this to match your protected routes
};
