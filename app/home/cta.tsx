import Image from "next/image";
import screenshot from "./screenshot.jpg";

import {
  CloudUploadIcon,
  MapPinnedIcon,
  PizzaIcon,
  UserRoundCheckIcon,
} from "lucide-react";

const features = [
  {
    name: "Inscrivez-vous.",
    description: "Simplement par email et mot de passe.",
    icon: UserRoundCheckIcon,
  },
  {
    name: "Ajoutez vos coordonnées.",
    description:
      "Adresse, téléphone, horaires d'ouverture, tout ce qu'il faut pour vous trouver.",
    icon: MapPinnedIcon,
  },
  {
    name: "Créez vos pizzas.",
    description:
      "Photo, prix, ingrédients. Votre menu sera automatiquement généré et mis à jour.",
    icon: PizzaIcon,
  },
  {
    name: "C'est déjà en ligne.",
    description: "",
    icon: CloudUploadIcon,
  },
];

export function CTA() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-primary">
                En ligne en quelques minutes
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Peu d'efforts
              </p>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Beaucoup de résultats.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-foreground">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            src={screenshot}
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
