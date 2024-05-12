import { createClient } from "./server";

export async function getSession() {
  const supabase = createClient();

  return (await supabase.auth.getSession()).data.session;
}
