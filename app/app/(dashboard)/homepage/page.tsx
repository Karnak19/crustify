import { createClient } from "@/lib/supabase/server";
import { HomepageForm } from "./_components/homepage-form";

export default async function Homepage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  const { data } = await supabase
    .from("websites")
    .select("homepage_description, menu_button_text, contact_button_text")
    .eq("user_id", user.id)
    .single();

  const initialData = {
    description:
      data?.homepage_description ??
      "Découvrez nos délicieuses pizzas artisanales, préparées avec passion et des ingrédients frais sélectionnés avec soin.",
    menuButtonText: data?.menu_button_text ?? "Voir notre carte",
    contactButtonText: data?.contact_button_text ?? "Nous contacter",
  };

  return (
    <div className="container py-6">
      <HomepageForm initialData={initialData} />
    </div>
  );
}
