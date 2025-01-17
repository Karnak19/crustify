export const ToastText = {
	success: {
		ingredient: {
			create: {
				title: "Création de l'ingrédient réussie",
				description: "L'ingrédient a été créé avec succès.",
			},
			delete: {
				title: "Suppression réussie",
				description: "L'ingrédient a été supprimé avec succès.",
			},
			update: {
				title: "Modification réussie",
				description: "L'ingrédient a été modifié avec succès.",
			},
		},
		category: {
			create: {
				title: "Création de la catégorie réussie",
				description: "La catégorie a été créée avec succès.",
			},
			delete: {
				title: "Suppression réussie",
				description: "La catégorie a été supprimée avec succès.",
			},
			update: {
				title: "Modification réussie",
				description: "La catégorie a été modifiée avec succès.",
			},
		},
	},
	error: {
		ingredient: {
			create: {
				title: "Erreur lors de la création de l'ingrédient",
				description: "Une erreur est survenue lors de la création de l'ingrédient.",
			},
			delete: {
				title: "Erreur lors de la suppression",
				description: "Une erreur est survenue lors de la suppression de l'ingrédient.",
			},
			update: {
				title: "Erreur lors de la modification",
				description: "Une erreur est survenue lors de la modification de l'ingrédient.",
			},
		},
		category: {
			create: {
				title: "Erreur lors de la création de la catégorie",
				description: "Une erreur est survenue lors de la création de la catégorie.",
			},
			delete: {
				title: "Erreur lors de la suppression",
				description: "Une erreur est survenue lors de la suppression de la catégorie.",
			},
			update: {
				title: "Erreur lors de la modification",
				description: "Une erreur est survenue lors de la modification de la catégorie.",
			},
		},
	},
} as const;
