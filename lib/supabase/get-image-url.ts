import "server-only";

import { createClient } from "./server";

export function getImageUrl({ path }: { path?: string | null }) {
  if (!path) {
    return "";
  }

  return `${
    createClient().storage.from("pizzas").getPublicUrl(path, {}).data.publicUrl
  }?fit=crop`;
}
