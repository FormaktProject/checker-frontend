
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./auth";

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const session = await getSession();
  const { pathname } = request.nextUrl;


  // Protect /admin routes (ADMIN only)
  if (pathname.startsWith("/admin")) {
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Protect teacher-specific routes (e.g., /teacher)
  if (pathname.startsWith("/checker")) {
    if (!session || session.user.role !== "CHECKER") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  if (pathname.startsWith("/user")) {
    if (!session || session.user.role !== "USER") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
    return NextResponse.next();
}
export const config = {
    matcher:  ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
  }