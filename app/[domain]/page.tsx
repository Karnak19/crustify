import { notFound } from "next/navigation";

import { getPizzas } from "@/lib/supabase/get-pizzas";
import { Hero } from "./hero";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { getImageUrl } from "@/lib/supabase/get-image-url";
import { createClient } from "@/lib/supabase/server";
import { getWebsiteData } from "@/lib/supabase/queries";
import { Hero2 } from "./sections/hero2";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export default async function SiteHomePage({
	params,
}: {
	params: { domain: string };
}) {
	const domain = decodeURIComponent(params.domain);
	const supabase = createClient();
	const [site, pizzas] = await Promise.all([getWebsiteData(supabase, domain), getPizzas(domain)]);
	console.log("🚀 ~ site:", site);

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
		<>
			<Hero {...site} />
			<Hero2 {...site} logo={getImageUrl({ path: site.logo })} />
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
		</>
	);
}
