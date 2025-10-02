import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "es", "th", "ja", "ko", "pt"]
const defaultLocale = "en"

function getLocale(request: NextRequest): string {
  // Check if locale is in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameLocale) return pathnameLocale

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    const languages = acceptLanguage.split(",").map((lang) => {
      const [code] = lang.trim().split(";")
      return code.split("-")[0]
    })

    for (const lang of languages) {
      if (locales.includes(lang)) {
        return lang
      }
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirect to locale-prefixed URL
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
