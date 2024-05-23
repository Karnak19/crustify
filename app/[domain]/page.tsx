import { notFound } from "next/navigation";

import { getSiteData } from "@/lib/supabase/get-site-data";
import { getPizzas } from "@/lib/supabase/get-pizzas";
import { PizzasMenu } from "@/components/pizzas-menu";

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

  return (
    <>
      <PizzasMenu
        sections={[
          {
            title: "Base Tomate",
            items: pizzas?.filter((pizza) => pizza.base === "tomato") || [],
          },
          {
            title: "Base Crème",
            items: pizzas?.filter((pizza) => pizza.base === "cream") || [],
          },
        ]}
      />
    </>
  );
}
