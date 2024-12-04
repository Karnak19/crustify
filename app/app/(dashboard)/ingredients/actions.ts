"use server";

console.log("🚀 Actions file loaded");

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ZSAError, createServerAction } from "zsa";


const ingridientSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  website_id: z.coerce.number()
});



export const createIngridientAction = createServerAction()
.input(
  z.object({
    name: z.string(),
  }),
  { type: "formData" }
)
.handler(async ({ input }) => {
  try {
    console.log("🚀 Starting ingridient creation with input:", input);
    const supabase = createClient();

    const { data: userData } = await supabase.auth.getUser();
    console.log("🚀 User data:", userData)    
    if (!userData.user) {
      throw new ZSAError("NOT_AUTHORIZED", "Vous devez être connecté");
    }

    const website = await supabase
      .from("websites")
      .select("id, subdomain")
      .eq("user_id", userData.user?.id)
      .single();

    console.log("🚀 Website data:", website)    
    if (!website.data) {
      throw new ZSAError("NOT_FOUND", "Site web non rencontré");
    }    
    const { error: ingridientError } = await supabase.from("ingredients").insert({
      name: input.name,
      website_id: website.data.id,
    });

    if (ingridientError) {
      console.error("🚀 Ingridient creation error:", ingridientError)    
      throw new ZSAError("ERROR", "Une erreur est survenue lors de la création de l'ingridient");    
    }    
    console.log("🚀 Ingridient created successfully!");    
    revalidatePath("/app/ingredients");    
    revalidatePath(`/${website.data.subdomain}`);    
    revalidatePath(`/${website.data.subdomain}/menu`);    
    return { success: true };    
  } catch (error) {
    console.error("🚀 Error in createIngridientAction:", error);    
    if (error instanceof ZSAError) throw error;    
    throw new ZSAError("ERROR", "Une erreur est survenue lors de la création de l'ingridient");    
  }    
}); 


export async function editIngridient(formData: FormData) {            
    const supabase = createClient();    
    const { data: userData } = await supabase.auth.getUser();    
    if (!userData.user) {    
      throw new Error("Unauthorized");    
    }    
    const website = await supabase    
      .from("websites")    
      .select("id, subdomain")    
      .eq("user_id", userData.user?.id)    
      .single();    
    if (!website) {    
      throw new Error("Website not found");    
    }    
    const ingridient = ingridientSchema.parse({    
      id: formData.get("id"),    
      name: formData.get("name"),    
      website_id: website?.data?.id,    
    });    
    await supabase.from("ingredients").update({ ...ingridient }).eq("id", ingridient.id);    
    revalidatePath("/app/ingredients");    
    revalidatePath(`/${website.data?.subdomain}`);    
    revalidatePath(`/${website.data?.subdomain}/menu`);   
}


export async function deleteIngridient(formData: FormData) {    
    const supabase = createClient();    
    const { data: userData } = await supabase.auth.getUser();    
    if (!userData.user) {    
      throw new Error("Unauthorized");    
    }    
    const id = formData.get("id");    
    if (!id) {    
      throw new Error("No id provided");    
    }    
    await supabase.from("ingredients").delete().eq("id", +id);    
    revalidatePath("/app/ingredients");    
} 

