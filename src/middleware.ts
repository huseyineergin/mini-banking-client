import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register"];

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

function redirect(request: NextRequest, to: string) {
  const url = new URL(to, request.url);
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  if (!token) return redirect(request, "/login");

  try {
    await jwtVerify(token, jwtSecret);
  } catch (error) {
    return redirect(request, "/login");
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
};
