"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CategoryIngredientForm() {
	return (
		<div className="space-y-4">
			<div className="flex flex-col space-y-2">
				<Label>Catégorie</Label>
				{!isAddingCategory ? (
					<div className="flex items-center space-x-2">
						<Select
							defaultValue={defaultCategory?.id.toString()}
							onValueChange={(value) => {
								const category = categories.find((c) => c.id.toString() === value);
								if (category) onCategorySelect?.(category);
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="Sélectionnez une catégorie" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category.id} value={category.id.toString()}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Button variant="outline" type="button" onClick={() => setIsAddingCategory(true)}>
							Nouvelle catégorie
						</Button>
					</div>
				) : (
					<div className="flex items-center space-x-2">
						<Input
							value={newCategoryName}
							onChange={(e) => setNewCategoryName(e.target.value)}
							placeholder="Nom de la catégorie"
						/>
						<Button type="button" onClick={handleCreateCategory}>
							Ajouter
						</Button>
						<Button
							variant="outline"
							type="button"
							onClick={() => {
								setIsAddingCategory(false);
								setNewCategoryName("");
							}}
						>
							Annuler
						</Button>
					</div>
				)}
			</div>

			{categoryError && <p className="text-sm text-destructive">{categoryError.message}</p>}
		</div>
	);
}
