"use client";

import { Button } from "@/components/ui/button";
import { LoaderIcon, Trash2 } from "lucide-react";
import { useServerAction } from "zsa-react";
import type { TAnyZodSafeFunctionHandler } from "zsa";
import { toast } from "@/hooks/use-toast";
import { ToastText } from "@/features/dashboard/toasts/text-toast";

interface DeleteButtonProps {
	id: number;
	onDelete: TAnyZodSafeFunctionHandler;
}

export function DeleteButton({ id, onDelete }: DeleteButtonProps) {
	const { execute, status, error } = useServerAction(onDelete);
	
	const handleDelete = async () => {
		try {
			if (error) throw error;
			execute({ id });
			toast(ToastText.success.ingredient.delete);
		} catch (error) {
			console.error("Error deleting:", error);
			toast({
				variant: "destructive",
				...ToastText.error.ingredient.delete,
			});
		}
	};

	return (
		<Button 
			onClick={handleDelete} 
			size="icon" 
			variant="ghost" 
			disabled={status === "pending"}
		>
			{status === "pending" ? (
				<LoaderIcon className="h-4 w-4 animate-spin" />
			) : (
				<Trash2 className="h-4 w-4" />
			)}
		</Button>
	);
}
