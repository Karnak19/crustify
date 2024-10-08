"use client";

import { Button } from "@/components/ui/button";
import type { Tables } from "@/lib/supabase/types";
import { getStripe } from "@/lib/stripe/client";
import { checkoutWithStripe } from "@/lib/stripe/server";
import { getErrorRedirect } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type Subscription = Tables<"subscriptions">;
type Product = Tables<"products">;
type Price = Tables<"prices">;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "lifetime" | "year" | "month" | "week" | "day";

export default function Pricing({ user, products, subscription }: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push("/signin/signup");
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  if (!products.length) {
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center" />
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{" "}
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );
  }
  return (
    <section>
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-foreground sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-muted-foreground/70 sm:text-center sm:text-2xl">
            Commencez votre pizzeria gratuitement ! Le plan Pro vous débloque
            plus de fonctionnalités.
          </p>
          <div className="relative self-center mt-6 bg-background rounded-lg p-0.5 flex sm:mt-8 border border-zinc-200">
            {intervals.map((interval) => {
              if (!interval) return null;
              return (
                <button
                  key={interval}
                  onClick={() =>
                    setBillingInterval(interval as BillingInterval)
                  }
                  type="button"
                  className={cn(
                    "rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8",
                    billingInterval === interval
                      ? "relative w-1/2 bg-primary border-primary-foreground shadow-sm text-primary-foreground"
                      : "ml-0.5 relative w-1/2 border border-transparent text-muted-foreground"
                  )}
                >
                  {interval.charAt(0).toUpperCase() + interval.slice(1)} billing
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {products.map((product) => {
            const price = product?.prices?.find(
              (price) => price.interval === billingInterval
            );
            if (!price) return null;
            const priceString = new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: price.currency || "EUR",
              minimumFractionDigits: 0,
            }).format((price?.unit_amount || 0) / 100);
            return (
              <div
                key={product.id}
                className={cn(
                  "flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-background",
                  {
                    "border border-primary": subscription
                      ? product.name === subscription?.prices?.products?.name
                      : product.name === "Freelancer",
                  },
                  "flex-1", // This makes the flex item grow to fill the space
                  "basis-1/3", // Assuming you want each card to take up roughly a third of the container's width
                  "max-w-xs" // Sets a maximum width to the cards to prevent them from getting too large
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold leading-6 text-foreground">
                    {product.name}
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    {product.description}
                  </p>
                  <p className="mt-8">
                    <span className="text-5xl font-extrabold text-foreground">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-foreground">
                      /{billingInterval}
                    </span>
                  </p>
                  <Button
                    variant="outline"
                    type="button"
                    // loading={priceIdLoading === price.id}
                    onClick={() => handleStripeCheckout(price)}
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center rounded-md hover:bg-primary hover:text-primary-foreground"
                  >
                    {priceIdLoading === price.id ? (
                      <>
                        <Loader2 className="animate-spin" />
                        <span>Chargement...</span>
                      </>
                    ) : subscription ? (
                      "Gérer"
                    ) : (
                      "S'inscrire"
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
