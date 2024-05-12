import "server-only";

import { createClient } from "./server";

export async function getCurrentUser() {
  return (await createClient().auth.getUser()).data.user;
}
