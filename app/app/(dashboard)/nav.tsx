"use client";

import { Home, PizzaIcon, ShieldCheck } from "lucide-react";
import NavItem from "./nav-item";

const nav = [
  {
    title: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    title: "Pizzas",
    path: "/pizzas",
    icon: PizzaIcon,
  },
  {
    title: "Pro",
    path: "/pro",
    icon: ShieldCheck,
  },
];

export default function Nav() {
  return (
    <nav className="flex flex-col items-center gap-4 px-2 py-4">
      {/* <Link
        href="#"
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
        <span className="sr-only">Acme Inc</span>
      </Link> */}

      {nav.map((item) => (
        <NavItem {...item} key={item.title} />
      ))}
    </nav>
  );
}
