// import { NextResponse } from 'next/server';
// import { i18n } from './i18n';
// import { match as matchLocale } from '@formatjs/intl-localematcher';
// import Negotiator from 'negotiator';

// function getLocale(request) {
//   // Negotiator expects plain object so we need to transform headers
//   const negotiatorHeaders = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   // Use negotiator and intl-localematcher to get best locale
//   const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
//     i18n.locales
//   );

//   if (!languages || languages.length === 0) {
//     return i18n.defaultLocale;
//   }

//   try {
//     return matchLocale(languages, i18n.locales, i18n.defaultLocale);
//   } catch (error) {
//     console.error('Error matching locale:', error);
//     return i18n.defaultLocale;
//   }
// }

// export function middleware(request) {
//   const pathname = request.nextUrl.pathname;

//   // Check if there is any supported locale in the pathname
//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
//   );

//   // Redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);

//     // e.g. incoming request is /products
//     // The new URL is now /en/products
//     return NextResponse.redirect(
//       new URL(
//         `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
//         request.url
//       )
//     );
//   }
// }

// export const config = {
//   // Matcher ignoring `/_next/` and `/api/`
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
import { NextResponse } from 'next/server';
import { i18n } from './i18n';
import { match as matchLocale } from '@formatjs/intl-localematcher';

function getPreferredLocale(acceptLanguageHeader) {
  // Parse the Accept-Language header and sort by quality
  const languages = acceptLanguageHeader
    .split(',')
    .map((lang) => {
      const parts = lang.split(';');
      const name = parts[0].trim();
      const q = parts[1] ? parseFloat(parts[1].split('=')[1]) : 1;
      return { name, q };
    })
    .filter((lang) => i18n.locales.includes(lang.name))
    .sort((a, b) => b.q - a.q);

  return languages.length > 0 ? languages[0].name : i18n.defaultLocale;
}

export function middleware(request) {
  try {
    const pathname = request.nextUrl.pathname;

    // Check if the pathname is missing a supported locale
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
      const acceptLanguageHeader = request.headers.get('accept-language') || '';
      const locale = getPreferredLocale(acceptLanguageHeader);
      const newUrl = new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      );
      return NextResponse.redirect(newUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
