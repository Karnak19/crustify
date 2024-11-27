export function getPublicUrl(path: string | null) {
  if (!path) {
    return "";
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
  }

  return `${supabaseUrl}/storage/v1/object/public/pizzas/${path}?fit=crop`;
}
