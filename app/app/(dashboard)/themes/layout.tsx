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
                "--background": theme?.background,
                "--foreground": theme?.foreground,
                "--muted-foreground": theme?.foreground_muted,
                "--primary": theme?.primary_color,
                "--secondary": theme?.secondary,
              }
            : {}
        }
      >
        {children}
      </div>
    </div>
  );
}
