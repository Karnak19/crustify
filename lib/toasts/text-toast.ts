export const ToastText = {
	success: {
		ingredient: {
			create: ["Création de l'ingrédient réussie", { description: "L'ingrédient a été créé avec succès." }],
			delete: ["Suppression réussie", { description: "L'ingrédient a été supprimé avec succès." }],
			update: ["Modification réussie", { description: "L'ingrédient a été modifié avec succès." }],
		},
		category: {
			create: ["Création de la catégorie réussie", { description: "La catégorie a been crian avec succès." }],
			delete: ["Suppression réussie", { description: "La catégorie a been supprimée avec succès." }],
			update: ["Modification réussie", { description: "La catégorie a been modifiée avec succès." }],
		},
	},
	error: {
		ingredient: {
			create: [
				"Erreur lors de la création de l'ingrédient",
				{ description: "Une erreur est survenue lors de la création de l'ingrédient." },
			],
			delete: [
				"Erreur lors de la suppression",
				{ description: "Une erreur est survenue lors de la suppression de l'ingrédient." },
			],
			update: [
				"Erreur lors de la modification",
				{ description: "Une erreur est survenue lors de la modification de l'ingrédient." },
			],
		},
		category: {
			create: [
				"Erreur lors de la création de la catégorie",
				{ description: "Une erreur est survenue lors de la création de la catégorie." },
			],
			delete: [
				"Erreur lors de la suppression",
				{ description: "Une erreur est survenue lors de la suppression de la catégorie." },
			],
			update: [
				"Erreur lors de la modification",
				{ description: "Une erreur est survenue lors de la modification de la catégorie." },
			],
		},
	},
} as const;
