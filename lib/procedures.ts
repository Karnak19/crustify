import { createServerActionProcedure, ZSAError } from "zsa";
import { createClient } from "./supabase/server";
import { getCurrentWebsite } from "./supabase/get-current-website";

export const withSupabaseProcedure = createServerActionProcedure().handler(async () => {
	const client = createClient();
	return { supabase: client };
});

export const authedWithWebsiteProcedure = createServerActionProcedure(withSupabaseProcedure).handler(async ({ ctx }) => {
	const client = createClient();

	const website = await getCurrentWebsite(client);

	if (!website) {
		throw new ZSAError("NOT_FOUND", "Site web non rencontré");
	}

	return { ...ctx, website };
});
