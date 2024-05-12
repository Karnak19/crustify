import "server-only";

import { createClient } from "./server";

export function getImageUrl({
  path,
  quality = 90,
  width,
  height,
}: {
  path?: string | null;
  quality?: number;
  width?: number;
  height?: number;
}) {
  if (!path) {
    return "/placeholder.png";
  }

  return createClient().storage.from("pizzas").getPublicUrl(path, {
    // transform: { quality, height, width },
  }).data.publicUrl;
}
