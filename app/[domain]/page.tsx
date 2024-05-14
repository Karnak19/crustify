import Image from "next/image";
import { notFound } from "next/navigation";

import { getSiteData } from "@/lib/supabase/get-site-data";
import { getPizzas } from "@/lib/supabase/get-pizzas";
import { getImageUrl } from "@/lib/supabase/get-image-url";
import { dynamicBlurDataUrl } from "@/lib/dynamic-blur-data";
import type { Database } from "@/lib/supabase/types";

export const dynamic = "force-static";

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  console.log("🚀 ~ params:", params);
  const domain = decodeURIComponent(params.domain);
  const [site, pizzas] = await Promise.all([
    getSiteData(domain),
    getPizzas(domain),
  ]);

  if (!site.data) {
    notFound();
  }

  return (
    <ul className="grid place-items-center grid-flow-col">
      {pizzas?.map((pizza) => {
        return <Item key={pizza.id} {...pizza} />;
      })}
    </ul>
  );
}

async function Item(
  props: Partial<Database["public"]["Tables"]["pizzas"]["Row"]>
) {
  const blurHash = await dynamicBlurDataUrl(
    getImageUrl({ path: props.picture })
  );

  return (
    <li key={props.id}>
      <h2>{props.name}</h2>
      <p>{props.price}</p>
      <div className="relative aspect-square h-96">
        <Image
          src={getImageUrl({ path: props.picture })}
          alt={props.name || "Pizza"}
          fill
          sizes="400px"
          className="object-cover"
          blurDataURL={blurHash}
          placeholder="blur"
        />
      </div>
    </li>
  );
}
