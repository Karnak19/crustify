import { NextResponse, type NextRequest } from "next/server";
import { env } from "./env";
import { getSession } from "./lib/supabase/get-session";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  if (
    hostname?.includes("---") &&
    hostname?.endsWith(`.${env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname?.split("---")[0]}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (hostname === `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    const session = await getSession();
    console.log("🚀 ~ middleware ~ session:", session?.user.email);

    const publicPaths = ["/login", "/signup", "/forgot-password"];

    if (!session && !publicPaths.includes(path)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (session && publicPaths.includes(path)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url)
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url)
    );
  }

  console.log("🚀 ~ middleware ~ hostname:", hostname);

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
