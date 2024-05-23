import { PizzasMenu } from "@/components/pizzas-menu";
import { getPizzas } from "@/lib/supabase/get-pizzas";

export default async function MenuPage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const pizzas = await getPizzas(domain);

  return (
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
  );
}
