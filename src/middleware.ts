import createMiddleware from 'next-intl/middleware';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// export function middleware(request: NextRequest) {
//   // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
//   // Getting cookies from the request using the `RequestCookies` API
//   let cookie = request.cookies.get('access_token');
//   const language = request.cookies.get('NEXT_LOCALE');
//   let url = request.url;
//   if (!cookie) {
//     console.log(url);
//     return NextResponse.redirect(`http://localhost:3000/`);
//   }
// }

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'vi'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'vi',
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
