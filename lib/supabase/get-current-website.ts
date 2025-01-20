import type { SupabaseClient } from "@supabase/supabase-js";

export async function getCurrentWebsite(supabase: SupabaseClient) {
	const { data: userData } = await supabase.auth.getUser();
	if (!userData.user) {
		throw new Error("Vous devez être connecté");
	}

	const website = await supabase.from("websites").select("id, subdomain").eq("user_id", userData.user?.id).single<{
		id: number;
		subdomain: string;
	}>();

	if (!website.data || website.error) {
		console.error("Error fetching website:", website.error);
		return null;
	}

	return website.data;
}
