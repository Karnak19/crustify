import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { env } from "@/env";

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    href: "/register?selected=basic",
    price: { monthly: "0", annually: "0" },
    description: "Tout le nécessaire pour démarrer votre pizzeria en ligne.",
    features: [
      "Sous-domaine .crustify.fr automatique",
      "Nombre de pizzas illimité",
    ],
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "/register?selected=pro",
    price: { monthly: "40", annually: "30" },
    description:
      "Toutes les fonctionnalités de la formule Basic, plus des outils essentiels pour développer votre activité.",
    features: [
      "Sous-domaine .crustify.fr automatique",
      "Possibilité d'utiliser votre propre nom de domaine",
      "Analytics avancées",
      "24-heures support",
    ],
  },
];

export function Pricing() {
  const isLocal = process.env.NODE_ENV === "development";

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary ">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Le bon plan selon vos besoins
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-center">
          Pas de frais cachés, pas de bullshit, deux choix disponibles selon
          votre besoin
        </p>
        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-border sm:mx-auto lg:mt-0 lg:mx-auto lg:max-w-4xl lg:grid-cols-2 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => {
              const url = isLocal
                ? `http://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/signup?tier=${tier.id}`
                : `https://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/signup?tier=${tier.id}`;

              const isFree = tier.price.annually === "0";

              return (
                <div
                  key={tier.id}
                  className="pt-16 lg:px-8 lg:pt-0 xl:px-14 flex flex-col"
                >
                  <h3
                    id={tier.id}
                    className="text-base font-semibold leading-7 text-foreground"
                  >
                    {tier.name}
                  </h3>
                  {!isFree ? (
                    <>
                      <p className="mt-6 flex items-baseline gap-x-1">
                        <span className="text-5xl font-bold tracking-tight text-foreground">
                          {tier.price.annually}€
                        </span>
                        <span className="text-sm font-semibold leading-6 text-muted-foreground">
                          /mois
                        </span>
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground/80">
                        ou {tier.price.monthly}€ par mois{" "}
                        <i>(facturation mensuelle)</i>
                      </p>
                    </>
                  ) : (
                    <p className="mt-6 flex items-baseline gap-x-1">
                      <span className="text-5xl font-bold tracking-tight text-foreground">
                        FREE
                      </span>
                    </p>
                  )}
                  <Button asChild className="w-full leading-6 mt-2">
                    <Link href={url}>Choisir ce plan</Link>
                  </Button>
                  <p className="mt-10 text-sm font-semibold leading-6 text-foreground">
                    {tier.description}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-muted-foreground ">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckCircleIcon
                          className="h-6 w-5 flex-none text-primary"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
