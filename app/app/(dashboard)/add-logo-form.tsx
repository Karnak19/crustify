"use client";

import { Button } from "@/components/ui/button";
import { addLogo } from "./actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AddLogoForm() {
  const [state, action] = useFormState(addLogo, null);
  const router = useRouter();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state]);

  return (
    <form className="grid gap-4" action={action}>
      <input type="file" name="file" required />
      <Button type="submit">Upload</Button>
    </form>
  );
}
