import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TEAM_ID_VERCEL: z.string().optional(),
    PROJECT_ID_VERCEL: z.string(),
    AUTH_BEARER_TOKEN: z.string(),
    PLAUSIBLE_API_KEY: z.string().optional(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),

    NEXT_PUBLIC_ROOT_DOMAIN: z.string().default("localhost:3000"),
    NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX: z.string().optional(),

    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional(),

    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    PLAUSIBLE_API_KEY: process.env.PLAUSIBLE_API_KEY,
    TEAM_ID_VERCEL: process.env.TEAM_ID_VERCEL,
    PROJECT_ID_VERCEL: process.env.PROJECT_ID_VERCEL,
    AUTH_BEARER_TOKEN: process.env.AUTH_BEARER_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,

    NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
    NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX:
      process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX,

    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
