import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

export default async function AnalyticsPage() {
  const supabase = createClient();

  const { error, data: userData } = await supabase.auth.getUser();

  if (error) {
    notFound();
  }

  const { data: website } = await supabase
    .from("websites")
    .select("plausible_shared_link, user_id:profiles (plan)")
    .eq("user_id", userData.user.id)
    .single();

  if (!website) {
    notFound();
  }

  if (website.user_id?.plan !== "pro" || !website.plausible_shared_link) {
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
        src="http://plausible.rover.vernouillet.dev/js/embed.host.js"
      />
    </Card>
  );
}
