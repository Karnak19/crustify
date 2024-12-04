import { Home, LineChart, PizzaIcon, ShieldCheck, ChefHat } from "lucide-react";

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
    title:"Ingredients",
    path:"/ingredients",
    icon: ChefHat,
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
