import {
  ChevronRightIcon,
  PizzaIcon,
  ShieldCheckIcon,
  HomeIcon,
  LineChart,
} from "lucide-react";
import Link from "next/link";

import logo from "../logo.png";
import Image from "next/image";

const links = [
  {
    name: "Dashboard",
    href: "/",
    description: "Dashboard du site",
    icon: HomeIcon,
  },
  {
    name: "Pizzas",
    href: "/pizzas",
    description: "Liste de toutes vos pizzas",
    icon: PizzaIcon,
  },
  {
    name: "Analytics",
    href: "/analytics",
    description: "Vos statistiques de visites",
    icon: LineChart,
  },
  {
    name: "Pro",
    href: "/pro",
    description: "Upgradez votre compte au plan Pro",
    icon: ShieldCheckIcon,
  },
];

export default function DashboardNotFound() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
      <Image
        className="mx-auto h-10 w-auto sm:h-12"
        src={logo}
        alt="Your Company"
      />
      <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
        <p className="text-base font-semibold leading-8 text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
          Cette page n'existe pas
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
          Désolé, nous n'avons pas trouvé la page que vous cherchez.
        </p>
      </div>
      <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
        <h2 className="sr-only">Popular pages</h2>
        <ul className="-mt-6 divide-y divide-primary/5 border-b border-primary/5">
          {links.map((link) => (
            <li key={link.href} className="relative flex gap-x-6 py-6">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-primary/10">
                <link.icon
                  className="h-6 w-6 text-primary"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-auto">
                <h3 className="text-sm font-semibold leading-6 text-primary">
                  <Link href={link.href}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {link.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {link.description}
                </p>
              </div>
              <div className="flex-none self-center">
                <ChevronRightIcon
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-primary-foreground"
          >
            <span aria-hidden="true">&larr;</span>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
