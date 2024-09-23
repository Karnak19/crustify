import { env } from "@/env";
import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2024-06-20",
  appInfo: {
    name: "crustify",
    // url: "https://nextjs-with-stripe-typescript-demo.vercel.app",
  },
});
