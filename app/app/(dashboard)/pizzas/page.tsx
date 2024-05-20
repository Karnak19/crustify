import { Dashboard } from "./dashboard";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

export default async function PizzasPage() {
  const supabase = createClient();

  const me = await supabase.auth.getUser();

  if (!me.data.user) {
    notFound();
  }

  const { data: website } = await supabase
    .from("websites")
    .select("id")
    .eq("user_id", me.data.user.id)
    .single();

  if (!website) {
    redirect("/");
  }

  return <Dashboard />;
}
