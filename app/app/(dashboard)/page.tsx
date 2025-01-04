import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

import { getImageUrl } from "@/lib/supabase/get-image-url";
import Image from "next/image";
import { AddContactForm } from "./add-contact-form";
import { AddLogoForm } from "./add-logo-form";
import { Setup } from "./setup";

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
        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <AddContactForm
              {...{
                websiteId: website.id,
                phone: website.phone ?? "",
                street_address: website.street_address ?? "",
                zip_code: website.zip_code ?? "",
                city: website.city ?? "",
              }}
            />
          </CardContent>
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
