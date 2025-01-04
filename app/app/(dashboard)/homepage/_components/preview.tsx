"use client";

import { Button } from "@/components/ui/button";

interface PreviewProps {
  description: string;
  menuButtonText: string;
  contactButtonText: string;
}

export function Preview({
  description,
  menuButtonText,
  contactButtonText,
}: PreviewProps) {
  return (
    <div className="relative overflow-hidden bg-background border rounded-lg">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
          <div className="relative px-6 py-8 sm:py-16 lg:px-8 lg:py-20 lg:pr-0">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <div className="mb-8 flex items-center gap-x-3">
                <div className="rounded-full px-3 py-1 text-sm leading-6 text-foreground ring-1 ring-primary/20">
                  🍕 Pizzeria Artisanale
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl [text-wrap:balance]">
                Votre Pizzeria
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {description}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button size="lg">{menuButtonText}</Button>
                <Button variant="outline" size="lg">
                  {contactButtonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
