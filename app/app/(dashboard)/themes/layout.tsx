"use client";

import { type PropsWithChildren, useState } from "react";
import useSWR from "swr";
import { getThemes } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export default function ThemeLayout({ children }: PropsWithChildren<unknown>) {
  const [supabase] = useState(createClient());
  const [theme, setTheme] = useState<
    Database["public"]["Tables"]["themes"]["Row"] | null
  >(null);

  const { data: themes, error } = useSWR("themes", () => getThemes(supabase));

  return (
    <div className="grid grid-cols-3 gap-4 h-[calc(100vh-10rem)]">
      <div className="col-span-1 rounded-md border p-4">
        <h1>Themes</h1>
        {themes?.map((theme) => {
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setTheme(theme)}
            >
              {theme.name}
            </button>
          );
        })}
      </div>

      {/* Preview */}
      <div
        className="col-span-2 rounded-md border overflow-auto bg-background text-foreground"
        style={
          theme
            ? {
                "--background": `${theme?.background ?? "179 68% 100%"}`,
                "--foreground": `${theme?.foreground ?? "179 79% 0%"}`,
                "--muted": `${theme?.muted ?? "179 21% 85%"}`,
                "--muted-foreground": `${
                  theme?.foreground_muted ?? "179 3% 39%"
                }`,
                "--popover": `${theme?.popover ?? "179 68% 100%"}`,
                "--popover-foreground": `${
                  theme?.popover_foreground ?? "179 79% 0%"
                }`,
                "--card": `${theme?.card ?? "0 0% 99%"}`,
                "--card-foreground": `${theme?.card_foreground ?? "0 0% 0%"}`,
                "--border": `${theme?.border ?? "179 9% 90%"}`,
                "--input": `${theme?.input ?? "179 9% 85%"}`,
                "--primary": `${theme?.primary_color ?? "179 64% 14%"}`,
                "--primary-foreground": `${
                  theme?.primary_foreground ?? "179 64% 54%"
                }`,
                "--secondary": `${theme?.secondary_color ?? "179 2% 89%"}`,
                "--secondary-foreground": `${
                  theme?.secondary_foreground ?? "179 2% 29%"
                }`,
                "--accent": `${theme?.accent ?? "179 2% 89%"}`,
                "--accent-foreground": `${
                  theme?.accent_foreground ?? "179 2% 29%"
                }`,
                "--destructive": `${theme?.destructive ?? "7 95% 28%"}`,
                "--destructive-foreground": `${
                  theme?.destructive_foreground ?? "7 95% 88%"
                }`,
                "--ring": `${theme?.ring ?? "179 64% 14%"}`,
                "--radius": `${theme?.radius ?? "0.5rem"}`,
              }
            : {}
        }
      >
        {children}
      </div>
    </div>
  );
}
