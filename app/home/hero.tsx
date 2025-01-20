import Image from "next/image";

import { env } from "@/env";

import Pizza1 from "./pizza-1.jpg";
import Pizza2 from "./pizza-2.jpg";
import Pizza3 from "./pizza-3.jpg";
import Pizza4 from "./pizza-4.jpg";
import Pizza5 from "./pizza-5.jpg";

export function Hero() {
  return (
    <div className="relative isolate">
      <div className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Créez le site web de votre pizzeria facilement
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground sm:max-w-md lg:max-w-none">
                Créez un site web magnifique pour votre pizzeria en quelques
                minutes. Aucun codage requis.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href={`http://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Commencer gratuitement
                </a>
              </div>
            </div>
            <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
              <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                <div className="relative">
                  <Image
                    quality={100}
                    src={Pizza1}
                    alt=""
                    width={176}
                    height={264}
                    className="aspect-[2/3] w-full rounded-xl bg-background object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>
              <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                <div className="relative">
                  <Image
                    quality={100}
                    src={Pizza2}
                    alt=""
                    width={176}
                    height={264}
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="relative">
                  <Image
                    quality={100}
                    src={Pizza3}
                    alt=""
                    width={276}
                    height={264}
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>
              <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                <div className="relative">
                  <Image
                    quality={100}
                    src={Pizza4}
                    alt=""
                    width={176}
                    height={264}
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
                <div className="relative">
                  <Image
                    quality={100}
                    src={Pizza5}
                    alt=""
                    width={276}
                    height={264}
                    className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
