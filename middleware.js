import { NextResponse } from 'next/server';

export function middleware(req) {
  const isAuth = req.cookies.get('admin_auth')?.value;
  const { pathname } = req.nextUrl;

  // If already logged in and visiting /admin/login → go to /admin
  if (pathname.startsWith('/admin/login') && isAuth) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // If NOT logged in and visiting /admin (but not /admin/login) → redirect to /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !isAuth) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Apply only to /admin pages
};
