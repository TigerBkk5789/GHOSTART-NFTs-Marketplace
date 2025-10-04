import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { NotificationPermission } from "@/components/notification-permission"

export default async function NotificationsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = getTranslations(locale)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">{t.notifications.title}</h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {t.notifications.subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <NotificationPermission locale={locale} />
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">{t.notifications.typesTitle}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">🎨 {t.notifications.type1}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.notifications.type1Description}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">🎁 {t.notifications.type2}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.notifications.type2Description}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">📝 {t.notifications.type3}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.notifications.type3Description}
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">💰 {t.notifications.type4}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.notifications.type4Description}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center p-6 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">{t.notifications.guidelinesTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {t.notifications.guidelinesDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
