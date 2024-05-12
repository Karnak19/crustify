import "server-only";

import { createClient } from "./server";

export function getImageUrl(path?: string | null) {
  if (!path) {
    return "/placeholder.png";
  }

  return createClient().storage.from("pizzas").getPublicUrl(path).data
    .publicUrl;
}
