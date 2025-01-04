import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase/get-image-url";
import Link from "next/link";

interface HeroProps {
  name: string | null;
  logo: string | null;
  subdomain: string;
  homepage_description?: string | null;
  menu_button_text?: string | null;
  contact_button_text?: string | null;
}

export function Hero({
  name,
  logo,
  homepage_description,
  menu_button_text,
  contact_button_text,
}: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <div className="mb-8 flex items-center gap-x-3">
                <div className="rounded-full px-3 py-1 text-sm leading-6 text-foreground ring-1 ring-primary/20">
                  🍕 Pizzeria Artisanale
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl [text-wrap:balance]">
                {name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {homepage_description ??
                  "Découvrez nos délicieuses pizzas artisanales, préparées avec passion et des ingrédients frais sélectionnés avec soin."}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button asChild size="lg">
                  <Link href="/menu">
                    {menu_button_text ?? "Voir notre carte"}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">
                    {contact_button_text ?? "Nous contacter"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {logo ? (
        <div className="bg-background lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            <img
              className="h-full w-full object-cover"
              src={getImageUrl({ path: logo })}
              // biome-ignore lint/a11y/noRedundantAlt: <explanation>
              alt={`${name} - Photo de la pizzeria`}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
