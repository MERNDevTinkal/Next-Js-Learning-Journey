import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";

    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";

    // Sabse pehle, agar kuch aur path hai, to "/" pe le jao
    if (path !== "/" && !isPublicPath && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    //  . Agar  login page pe hai aur already login hai => home redirect
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    //  3. Agar private page pe hai aur login nahi hai => login redirect
    if (!isPublicPath && !token && path !== "/") {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

// Matcher config
export const config = {
    matcher: [
      "/",
      "/login",
      "/signup",
      "/verifyemail",
      "/profile/:path*",
    ]
}
