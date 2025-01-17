"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface DeleteButtonConfirmationProps {
	id: string | number;
	onDelete: (id: string | number) => Promise<{ error: Error | null }>;
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	size?: "default" | "sm" | "lg" | "icon";
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function DeleteButtonConfirmation({
	id,
	onDelete,
	title = "Êtes-vous sûr ?",
	description = "Cette action ne peut pas être annulée.",
	confirmText = "Supprimer",
	cancelText = "Annuler",
	size = "icon",
	variant = "ghost",
}: DeleteButtonConfirmationProps) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleDelete = async () => {
		setIsLoading(true);
		try {
			const { error } = await onDelete(id);
			if (error) throw error;

			toast({
				title: "Suppression réussie",
				description: "L'élément a été supprimé avec succès.",
			});
			setOpen(false);
		} catch (error) {
			console.error("Error deleting:", error);
			toast({
				variant: "destructive",
				title: "Erreur lors de la suppression",
				description: "Une erreur est survenue lors de la suppression.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<Button
				size={size}
				variant={variant}
				className="h-8 w-8"
				disabled={isLoading}
				onClick={() => setOpen(true)}
				title="Supprimer"
			>
				<Trash2 className="h-4 w-4" />
			</Button>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>
					<AlertDialogAction disabled={isLoading} onClick={handleDelete}>
						{confirmText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
