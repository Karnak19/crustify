import { env } from "@/env";
import { redirect } from "next/navigation";

export default async function Register({
  searchParams,
}: {
  searchParams: {
    selected: string;
  };
}) {
  const isLocal = process.env.NODE_ENV === "development";

  const sp = new URLSearchParams({
    redirect: searchParams.selected === "pro" ? "pro" : "",
    selected: searchParams.selected,
  });

  // sp.

  return redirect(
    isLocal
      ? `http://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/signup`
      : `https://app.${env.NEXT_PUBLIC_ROOT_DOMAIN}/signup`
  );
}
