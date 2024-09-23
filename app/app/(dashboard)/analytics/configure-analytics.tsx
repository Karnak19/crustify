"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { configureAnalytics } from "./actions";
import { useServerAction } from "zsa-react";
import type { Database } from "@/lib/supabase/types";

export function ConfigureAnalytics(
  props: Database["public"]["Tables"]["websites"]["Row"]
) {
  const { execute, isPending } = useServerAction(configureAnalytics);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Oups ! Il y a un problème avec votre analytics.</p>
        <form action={execute}>
          <input type="hidden" name="type" value="subdomain" />
          <input type="hidden" name="subdomain" value={props.subdomain} />

          <Button type="submit" disabled={isPending}>
            {isPending ? "En cours..." : "Lancer la configuration"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
