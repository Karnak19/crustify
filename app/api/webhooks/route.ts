import { stripe } from "@/lib/stripe/config";
import { env } from "@/env";
import type Stripe from "stripe";
import {
  deletePriceRecord,
  deleteProductRecord,
  manageSubscriptionStatusChange,
  upsertPriceRecord,
  upsertProductRecord,
} from "@/lib/supabase/admin";

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

const relevantEventTypes = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "checkout.session.completed",
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
]);

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
    console.error(`Webhook signature verification failed: ${String(err)}`);
    return new Response(`Webhook Error: ${String(err)}`, { status: 400 });
  }

  if (!relevantEventTypes.has(event.type)) {
    console.log(`Unhandled event type ${event.type}`);
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case "product.created":
      case "product.updated":
        await upsertProductRecord(event.data.object as Stripe.Product);
        break;
      case "product.deleted":
        await deleteProductRecord(event.data.object as Stripe.Product);
        break;
      case "price.created":
      case "price.updated":
        await upsertPriceRecord(event.data.object as Stripe.Price);
        break;
      case "price.deleted":
        await deletePriceRecord(event.data.object as Stripe.Price);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await manageSubscriptionStatusChange(
          subscription.id,
          subscription.customer as string,
          event.type === "customer.subscription.created"
        );
        break;
      }
      case "checkout.session.completed": {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        if (checkoutSession.mode === "subscription") {
          await manageSubscriptionStatusChange(
            checkoutSession.subscription as string,
            checkoutSession.customer as string,
            true
          );
        }
        break;
      }
      default:
        throw new Error(`Unhandled irrelevant event type: ${event.type}`);
    }
  } catch (error) {
    console.error(error);
    return new Response("Webhook handler failed, check logs", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }));
}
