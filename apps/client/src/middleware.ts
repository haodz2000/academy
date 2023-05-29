// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { JwtCookieToken, LoginQueryParam } from '@libs/constants/auth';
import { isValidIdRedirectUrl } from '@client/utils/auth';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (
    ['/500', '/405', '/404', '/401', '/400', '/403'].includes(
      request.nextUrl.pathname
    )
  ) {
    return response;
  }
  if (request.nextUrl.pathname.startsWith('/')) {
    return response;
  }
  if (request.cookies.has(JwtCookieToken)) {
    return response;
  } else {
    let redirectUrl: string | null = request.url ?? null;
    if (!isValidIdRedirectUrl(redirectUrl)) {
      redirectUrl = null;
    }
    if (
      redirectUrl === process.env.NEXT_PUBLIC_ID_CLIENT_BASE_URL ||
      redirectUrl === `${process.env.NEXT_PUBLIC_ID_CLIENT_BASE_URL}/`
    ) {
      redirectUrl = null;
    }
    const queryParams: Record<string, any> = {};
    if (redirectUrl) {
      queryParams[LoginQueryParam.redirectUrl] = redirectUrl;
    }
    const queryString = new URLSearchParams(queryParams);
    return NextResponse.redirect(
      new URL(`/${queryString ? `?${queryString}` : ''}`, request.url),
      {
        status: 303,
      }
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|static|images|favicon.ico|_next).*)',
};
