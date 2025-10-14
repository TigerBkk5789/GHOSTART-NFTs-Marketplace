import { getTranslations } from "@/lib/translations"
import type { Locale } from "@/lib/i18n"
import { MarketplaceClient } from "@/components/marketplace-client"

interface MarketplacePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function MarketplacePage({ params }: MarketplacePageProps) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return <MarketplaceClient t={t} />;
}
