import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyWebsite, getSubscription } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ConfigureAnalytics } from "./configure-analytics";

export default async function AnalyticsPage() {
  const supabase = createClient();

  const [website, subscription] = await Promise.all([
    getMyWebsite(supabase),
    getSubscription(supabase),
  ]);

  if (!website) {
    notFound();
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          L'analytics est une fonctionnalité Pro.
          <Button asChild variant="link">
            <Link href="/pro">
              Vous pouvez passer à la version Pro pour l'activer.
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!website.plausible_shared_link) {
    return <ConfigureAnalytics {...website} />;
  }
  return (
    <Card>
      <iframe
        title="Plausible Analytics"
        plausible-embed
        src={website.plausible_shared_link.replace("http", "https")}
        loading="lazy"
        style={{ width: "1px", minWidth: "100%", height: "1600px" }}
      />
      <Script
        async
        src="https://plausible.rover.vernouillet.dev/js/embed.host.js"
      />
    </Card>
  );
}
