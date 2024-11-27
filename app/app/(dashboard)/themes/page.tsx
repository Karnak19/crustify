import { Contact } from "@/app/[domain]/contact";
import { Hero } from "@/app/[domain]/hero";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { getImageUrl } from "@/lib/supabase/get-image-url";
import { getPizzas } from "@/lib/supabase/get-pizzas";
import { getMyWebsite } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";

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

export default async function ThemesPage() {
  const supabase = createClient();
  const website = await getMyWebsite(supabase);
  const pizzas = await getPizzas(website.subdomain);

  return (
    <>
      <Hero {...website} />

      {pizzas ? (
        <>
          <InfiniteMovingCards
            className="mx-auto"
            speed="slow"
            items={
              pizzas
                .filter((p) => p.base === "tomato" && p.picture)
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
                .filter((p) => p.base === "cream" && p.picture)
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
      {website?.name ? (
        <Contact
          name={website.name}
          address={website.address}
          phone={website.phone}
        />
      ) : null}
    </>
  );
}
