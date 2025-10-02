export const locales = ["en", "es", "th", "ja", "ko", "pt"] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  th: "ไทย",
  ja: "日本語",
  ko: "한국어",
  pt: "Português",
}

export const defaultLocale: Locale = "en"
