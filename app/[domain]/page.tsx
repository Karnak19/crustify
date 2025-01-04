import { notFound } from "next/navigation";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { getImageUrl } from "@/lib/supabase/get-image-url";
import { getPizzas } from "@/lib/supabase/get-pizzas";
import { getWebsiteData } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { Hero } from "./hero";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const supabase = createClient();
  const [site, pizzas] = await Promise.all([
    getWebsiteData(supabase, domain),
    getPizzas(domain),
  ]);

  if (!site) {
    notFound();
  }
  const base = (base: string) => {
    switch (base) {
      case "tomato":
        return "Tomate";
      case "cream":
        return "Crème";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="relative">
      <Hero {...site} />

      {pizzas ? (
        <div className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

          <div className="relative">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Nos Pizzas Base Tomate
                </h2>
                <p className="mt-2 text-lg leading-8 text-muted-foreground">
                  Des saveurs méditerranéennes authentiques
                </p>
              </div>
            </div>

            <InfiniteMovingCards
              className="mx-auto"
              speed="slow"
              items={
                pizzas
                  .filter((p) => p.base === "tomato" && p.picture)
                  .map((p) => ({
                    image: getImageUrl({ path: p.picture }),
                    name: p.name,
                    base: base(p.base),
                    description: p.description,
                    price: p.price.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }),
                  })) ?? []
              }
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
              <div className="mx-auto max-w-2xl text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Nos Pizzas Base Crème
                </h2>
                <p className="mt-2 text-lg leading-8 text-muted-foreground">
                  Une touche de douceur crémeuse
                </p>
              </div>
            </div>

            <InfiniteMovingCards
              className="mx-auto"
              speed="slow"
              direction="right"
              items={
                pizzas
                  .filter((p) => p.base === "cream" && p.picture)
                  .map((p) => ({
                    image: getImageUrl({ path: p.picture }),
                    name: p.name,
                    base: base(p.base),
                    description: p.description,
                    price: p.price.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }),
                  })) ?? []
              }
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
