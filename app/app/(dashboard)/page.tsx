import { createClient } from "@/lib/supabase/server";
import { Setup } from "./setup";
import { notFound } from "next/navigation";

export default async function DashboardPage() {
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
  console.log("🚀 ~ DashboardPage ~ me.data.user.id:", me.data.user.id);
  console.log("🚀 ~ DashboardPage ~ website:", website);

  if (!website) {
    return <Setup />;
  }

  return <div>Dashboard</div>;
}
