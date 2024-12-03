import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth((req) => {
    console.log(req);
    if (!req.auth && req.nextUrl.pathname !== '/auth/login') {
        const authURL = new URL('/auth/login', req.nextUrl.origin)
        return NextResponse.redirect(authURL)
    }
    if (req.nextUrl.pathname === '/auth/login') {
        if (req.auth) {
            const homeURl = new URL('/', req.nextUrl.origin)
            return NextResponse.redirect(homeURl)
        }
        return NextResponse.next()
    }
    NextResponse.next()
})
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}