import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Setup } from "./setup";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase/get-image-url";
import { AddLogoForm } from "./add-logo";

export default async function DashboardPage() {
  const supabase = createClient();

  const me = await supabase.auth.getUser();

  if (!me.data.user) {
    notFound();
  }

  const { data: website } = await supabase
    .from("websites")
    .select("*")
    .eq("user_id", me.data.user.id)
    .single();

  if (!website) {
    return <Setup />;
  }

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Coming soon</CardTitle>
              <CardDescription>
                On va bientôt ajouter des fonctionnalités pour vous aider à
                gérer votre site.
              </CardDescription>
            </div>
            {/* <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button> */}
          </CardHeader>
          <CardContent />
        </Card>
        <Card className="grid place-items-center min-h-[20rem]">
          {website.logo ? (
            <Image
              src={getImageUrl({ path: website.logo })}
              alt={website.name ?? ""}
              height={200}
              width={200}
            />
          ) : (
            <AddLogoForm />
          )}
        </Card>
      </div>
    </div>
  );
}
