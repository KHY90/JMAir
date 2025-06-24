import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Middleware 실행 - pathname:", pathname);

  if (pathname.startsWith("/admin")) {
    console.log("관리자 페이지 접근 감지");
    
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
      console.log("토큰 없음 - 로그인 페이지로 리다이렉트"); 
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET is not defined");
      }
      const decoded = jwt.verify(token, secret) as { userGrade: string };

      const allowedRoles = ["SUPERADMIN", "ADMIN", "ADMINWATCHER", "ENGINEER"];
      if (!allowedRoles.includes(decoded.userGrade)) {
        console.log("권한 없음 - 메인 페이지로 리다이렉트");
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (err) {
      console.error("Middleware token 검증 오류:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/admin'
  ]
};