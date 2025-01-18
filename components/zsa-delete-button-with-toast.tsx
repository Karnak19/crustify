"use client";

import { LoaderIcon, Trash2 } from "lucide-react";
import { useServerAction } from "zsa-react";
import type { TAnyZodSafeFunctionHandler } from "zsa";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ToastText } from "@/lib/toasts/text-toast";

interface DeleteButtonProps {
	id: number;
	onDeleteAction: TAnyZodSafeFunctionHandler;
}

export function ZsaDeleteButtonWithToast({ id, onDeleteAction }: DeleteButtonProps) {
	const { execute, isPending } = useServerAction(onDeleteAction, {
		onSuccess: () => {
			toast.success(...ToastText.success.ingredient.delete);
		},
		onError: () => {
			toast.error(...ToastText.error.ingredient.delete);
		},
	});

	return (
		<Button onClick={() => execute({ id })} type="button" size="icon" variant="ghost" disabled={isPending}>
			{isPending ? <LoaderIcon className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
		</Button>
	);
}
