import { Home, LineChart, Palette, PizzaIcon, ShieldCheck } from "lucide-react";

export const nav = [
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
    title: "Themes",
    path: "/themes",
    icon: Palette,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: LineChart,
  },
  {
    title: "Pro",
    path: "/pro",
    icon: ShieldCheck,
  },
];
