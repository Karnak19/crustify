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
      {nav.map((item) => (
        <NavItem {...item} key={item.title} />
      ))}
    </nav>
  );
}
