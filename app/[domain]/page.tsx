import { notFound } from "next/navigation";

import { getSiteData } from "@/lib/supabase/get-site-data";
import { getPizzas } from "@/lib/supabase/get-pizzas";
import { Hero } from "./hero";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { getImageUrl } from "@/lib/supabase/get-image-url";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [site, pizzas] = await Promise.all([
    getSiteData(domain),
    getPizzas(domain),
  ]);

  if (!site.data) {
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
    <>
      <Hero {...site.data} />
      {pizzas ? (
        <>
          <InfiniteMovingCards
            className="mx-auto"
            speed="slow"
            items={
              pizzas
                .filter((p) => p.base === "tomato")
                .map((p) => {
                  return {
                    image: getImageUrl({ path: p.picture }),
                    name: p.name,
                    base: base(p.base),
                    description: p.description,
                    price: p.price.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }),
                  };
                }) ?? []
            }
          />
          <InfiniteMovingCards
            className="mx-auto"
            speed="slow"
            direction="right"
            items={
              pizzas
                .filter((p) => p.base === "cream")
                .map((p) => {
                  return {
                    image: getImageUrl({ path: p.picture }),
                    name: p.name,
                    base: base(p.base),
                    description: p.description,
                    price: p.price.toLocaleString("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }),
                  };
                }) ?? []
            }
          />
        </>
      ) : null}
    </>
  );
}
