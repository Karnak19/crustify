"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";
import { createServerAction } from "zsa";

const formSchema = z.object({
  description: z.string().min(1, "La description est requise"),
  menuButtonText: z.string().min(1, "Le texte du bouton menu est requis"),
  contactButtonText: z.string().min(1, "Le texte du bouton contact est requis"),
});

export const updateHomepage = createServerAction()
  .input(formSchema)
  .handler(async ({ input }) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw "Non authentifié";

    await supabase
      .from("websites")
      .update({
        homepage_description: input.description,
        menu_button_text: input.menuButtonText,
        contact_button_text: input.contactButtonText,
      })
      .eq("user_id", user.id);

    return { success: true };
  });
