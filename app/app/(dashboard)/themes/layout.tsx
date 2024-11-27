"use client";

import {
  type PropsWithChildren,
  useCallback,
  useState,
  useEffect,
} from "react";
import useSWR from "swr";
import { getCurrentTheme, getThemes } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "sonner";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export default function ThemeLayout({ children }: PropsWithChildren<unknown>) {
  const [supabase] = useState(createClient());
  const { data: themes, error: themesError } = useSWR("themes", () =>
    getThemes(supabase)
  );
  const { data: currentTheme, mutate: mutateCurrentTheme } = useSWR(
    "current-theme",
    () => getCurrentTheme(supabase)
  );
  const [selectedTheme, setSelectedTheme] = useState<
    Database["public"]["Tables"]["themes"]["Row"] | null
  >(currentTheme ?? null);

  // Update selected theme when current theme loads
  useEffect(() => {
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, [currentTheme]);

  const handleApplyTheme = useCallback(async () => {
    if (!selectedTheme) return;

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      toast.error("You must be logged in to apply a theme");
      return;
    }

    const { data: website } = await supabase
      .from("websites")
      .select("id")
      .eq("user_id", userData.user.id)
      .single();

    if (!website) {
      toast.error("Website not found");
      return;
    }

    const { error } = await supabase
      .from("websites")
      .update({ theme_id: selectedTheme.id })
      .eq("id", website.id);

    if (error) {
      toast.error("Failed to apply theme");
      return;
    }

    // Revalidate the current theme
    await mutateCurrentTheme();
    toast.success("Theme applied successfully");
  }, [supabase, selectedTheme, mutateCurrentTheme]);

  return (
    <>
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
        <div className="col-span-1 rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Themes</h2>
            {selectedTheme && selectedTheme.id !== currentTheme?.id && (
              <Button size="sm" onClick={handleApplyTheme}>
                Apply Theme
              </Button>
            )}
          </div>
          <div className="space-y-2">
            {themes?.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTheme(t)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  selectedTheme?.id === t.id &&
                    "bg-accent text-accent-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: `hsl(${t.primary_color})` }}
                  />
                  <span>{t.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div
          className="col-span-2 rounded-lg border overflow-auto bg-background text-foreground p-6 shadow-sm transition-colors"
          style={
            selectedTheme
              ? {
                  "--background": `${
                    selectedTheme?.background ?? "179 68% 100%"
                  }`,
                  "--foreground": `${
                    selectedTheme?.foreground ?? "179 79% 0%"
                  }`,
                  "--muted": `${selectedTheme?.muted ?? "179 21% 85%"}`,
                  "--muted-foreground": `${
                    selectedTheme?.foreground_muted ?? "179 3% 39%"
                  }`,
                  "--popover": `${selectedTheme?.popover ?? "179 68% 100%"}`,
                  "--popover-foreground": `${
                    selectedTheme?.popover_foreground ?? "179 79% 0%"
                  }`,
                  "--card": `${selectedTheme?.card ?? "0 0% 99%"}`,
                  "--card-foreground": `${
                    selectedTheme?.card_foreground ?? "0 0% 0%"
                  }`,
                  "--border": `${selectedTheme?.border ?? "179 9% 90%"}`,
                  "--input": `${selectedTheme?.input ?? "179 9% 85%"}`,
                  "--primary": `${
                    selectedTheme?.primary_color ?? "179 64% 14%"
                  }`,
                  "--primary-foreground": `${
                    selectedTheme?.primary_foreground ?? "179 64% 54%"
                  }`,
                  "--secondary": `${
                    selectedTheme?.secondary_color ?? "179 2% 89%"
                  }`,
                  "--secondary-foreground": `${
                    selectedTheme?.secondary_foreground ?? "179 2% 29%"
                  }`,
                  "--accent": `${selectedTheme?.accent ?? "179 2% 89%"}`,
                  "--accent-foreground": `${
                    selectedTheme?.accent_foreground ?? "179 2% 29%"
                  }`,
                  "--destructive": `${
                    selectedTheme?.destructive ?? "7 95% 28%"
                  }`,
                  "--destructive-foreground": `${
                    selectedTheme?.destructive_foreground ?? "7 95% 88%"
                  }`,
                  "--ring": `${selectedTheme?.ring ?? "179 64% 14%"}`,
                  "--radius": `${selectedTheme?.radius ?? "0.5rem"}`,
                }
              : {}
          }
        >
          {children}
        </div>
      </div>
    </>
  );
}
